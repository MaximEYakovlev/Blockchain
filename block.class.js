class Block {
    constructor(time = Date.now(), data = {}) {
        this.time = time
        this.data = data
        this.lastHash = ''
    }

    createHash() {
        return sha256(this.lastHash + this.time + this.data)
    }
}