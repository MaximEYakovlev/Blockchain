class Block {
  constructor(time = Date.now(), data = {}) {
    this.time = time;
    this.data = data;
    this.lastHash = "";
    this.nonce = 0;
    this.difficulty = "0";
  }

  createHash() {
    return sha256(
      this.nonce + this.lastHash + this.time + JSON.stringify(this.data)
    );
  }

  mine() {
    let hash = this.createHash();
    return new Promise((resolve, reject) => {
      let i = setInterval(() => {
        if (this.kill) {
          clearInterval(i);
          reject();
        } else if (hash.startsWith(this.difficulty)) {
          clearInterval(i);
          resolve();
        } else {
          this.nonce++;
          hash = this.createHash();
        }
      }, 1000 / 30);
    });
  }

  mineOld() {
    let hash = this.createHash();
    while (!hash.startsWith(this.difficulty)) {
      this.nonce++;
      hash = this.createHash();
    }
  }
}
