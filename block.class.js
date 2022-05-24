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
          this.resolveTransactions();
          resolve();
        } else {
          this.nonce++;
          hash = this.createHash();
        }
      }, 1000 / 30);
    });
  }

  resolveTransactions() {
    let transactions = this.data.transactions;
    transactions.forEach((transaction) => {
      this.addMoney(transaction.to, transaction.amount);
    });
  }

  addMoney(receiver, amount) {
    let moneyTable = this.data.moneyTable || [];
    let entry = moneyTable.find((e) => e.name == receiver);
    if (!entry) {
      entry = { name: receiver, amount: 0 };
      moneyTable.push(entry);
    }
    entry.amount += amount;
    console.log("UPDATED TABLE", moneyTable);
    this.data.moneyTable = moneyTable;
  }

  mineOld() {
    let hash = this.createHash();
    while (!hash.startsWith(this.difficulty)) {
      this.nonce++;
      hash = this.createHash();
    }
  }
}
