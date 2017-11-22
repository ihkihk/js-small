//const SHA256 = require('crypto/sha256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        self.index = index;
        self.timestamp = timestamp;
        self.data = data;
        self.previousHash = previousHash;
        self.nonce = 0;

        self.hash = "0"; // block not yet mined
    }

    calculateHash() {
        return SHA256(self.index + self.timestamp + 
            JSON.stringify(self.data) + self.previousHash + 
            self.nonce).toString();
    }

    mineBlock(difficulty) {
        while (self.hash.substring(0, difficulty) != Array(difficulty).join("0")) {
            self.nonce++;
            self.hash = calculateHash();
        }
    }
}

class Blockchain{
    constructor(){
        self.chain = [self.createGenesisBlock()]
        self.difficulty = 3;
    }

    createGenesisBlock(){
        return new Block(0, Date(), "Genesis", "0")
    }

    addBlock(blk){
        blk.previousHash = self.chain[self.chain.length-1].hash;
        blk.mineBlock(3);
        self.chain.push(blk);
    }

    getLatestBlock() {
        return self.chain[self.chain.length-1]
    }

    isChainValid(){
        for (i=1; i < self.chain.length; i++){
            curBlk = self.chain[i];
            prevBlk = self.chain[i-1];
            if (curBlk.hash != curBlk.calculateHash())
                return false;
            if (curBlk.previousHash != prevBlk.hash)
                return false;
            return true;
        }

    }
}

var ivoCoin = new Blockchain();

ivoCoin.addBlock(new Block(1, "12/11/17", {amount:4}));
ivoCoin.addBlock(new Block(2, "13/11/17", {amount:-14}));
console.log("Is chain valid?: " + ivoCoin.isChainValid())
