const { Block } = require("./block.class");
const { Blockchain } = require("./blockchain.class");

console.log("Creating blockchain");
let mChain = new Blockchain();

mine();

function mine() {
  console.log("------- Starting to mine a new block -------");
  let block = new Block(Date.now(), { maxim: 100, vera: 50 });
  block.mine();
  mChain.addBlock(block);
  console.log(mChain.chain);
  mine();
}
