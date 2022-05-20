const DEFAULT_DATA = {
  transactions: [{ from: "BlockReward", to: this.name, amount: 5 }],
};

class MiningNode {
  isMining = false;
  currentBlock;

  constructor() {}

  toggle() {
    this.isMining = !this.isMining;
    if (this.isMining) {
      this.mine();
    } else {
      this.killCurrentBlock();
    }
  }

  killCurrentBlock() {
    if (this.currentBlock) {
      this.currentBlock.kill = true;
    }
  }

  mine() {
    this.currentBlock = new Block(Date.now(), DEFAULT_DATA);
    blockchain.addBlock(this.currentBlock);
    if (this.isMining) {
      this.mine();
    }
  }
}
