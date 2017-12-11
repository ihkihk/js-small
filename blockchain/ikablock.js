const crypto = require('crypto');


class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.nonce = 0;

        this.hash = "-"; // block not yet mined
    }

    calculateHash() {
        const SHA256 = crypto.createHash('sha256');

        return SHA256.update(this.index + this.timestamp + 
            JSON.stringify(this.data) + this.previousHash + 
            this.nonce).digest('hex');
    }

    mineBlock(difficulty) {
        const checkString = Array(difficulty+1).join("0");

        while (this.hash.substring(0, difficulty) !== checkString) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log(this.hash);
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()]
        this.difficulty = 1;
    }

    createGenesisBlock(){
        return new Block(0, Date(), "Genesis", "0")
    }

    addBlock(blk){
        blk.previousHash = this.getLatestBlock().hash;
        blk.mineBlock(this.difficulty);
        this.chain.push(blk);
    }

    getLatestBlock() {
        return this.chain[this.chain.length-1]
    }

    isChainValid(){
        for (var i = 1; i < this.chain.length; i++){
            const curBlk = this.chain[i];
            const prevBlk = this.chain[i-1];

            if (curBlk.hash != curBlk.calculateHash())
                return false;

            if (curBlk.previousHash != prevBlk.hash)
                return false;

            return true;
        }

    }
}

let ivoCoin = new Blockchain();

console.log("Mining block 1 ....");
ivoCoin.addBlock(new Block(1, "12/11/17", {amount:4}));
console.log("Mining block 2 ....");
ivoCoin.addBlock(new Block(2, "13/11/17", {amount:-14}));
console.log("Is chain valid?: " + ivoCoin.isChainValid())
