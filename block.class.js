class Block {
    constructor(time = Date.now(), data = {}) {
        this.time = time
        this.data = data
        this.lastHash = ''
        this.nonce = 0
        this.difficulty = '0000'
    }

    createHash() {
        return sha256(this.nonce + this.lastHash + this.time + JSON.stringify(this.data))
    }

    mine() {
        let hash = this.createHash()
        while (!hash.startsWith(this.difficulty)) {
            this.nonce++
            hash = this.createHash()
        }
    }
}