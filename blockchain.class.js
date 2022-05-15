class Blockchain {
    constructor() {
        this.chain = []
    }

    addBlock(block) {
        block.lastHash = this.getLastBlock().createHash()
        this.chain.push(Object.freeze(block))
    }

    isValid() {

    }

    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }
}