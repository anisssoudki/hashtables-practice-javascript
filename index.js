
let test = 'loaded index js';

console.log(test)
// datastructures and algorithms 
// arrays 
// some method in arrays have to loop over 
// imbeded js functions have different big o notations

// hash tables
// Your Hash: 5d41402abc4b2a76b9719d911017c592
// Your String: hello

// Use this generator to create an MD5 hash of a string:
// https://www.md5hashgenerator.com/
// this is indempotent meaning anytime we r giving a certain function its output is always the same

// really fast data access using hashes
// basket.grapes will generate a certain hash
// than i can locate that very fast in memory
// note there is different hashes algorithms and are used for different things like cryptography

// time complexity for hashes is o1 

// insert lookup delete and search are o(1) complexity 

let user = {
    age: 54,
    name: 'kyle',
    magic: true,
    scream: function() {
        console.log('ahhhh')
    }
}

console.log(user.age, user.name, user.magic)
user.scream() //O(1)
user.spell = "fireBall" //O(1)
console.log(user)

// when we have a collision it slows down our hash table because 
// we have limited space in memory and so although hashes are made to 
// evenly distribute data, we can have a collision scenario that would slow down
// the hash function the big o for this is O(n/k) where k is the size of the has table
// if we simplify o(n/k) would equal o(n)
// there is ways for collision resolution 
// https://en.wikipedia.org/wiki/Hash_table#Collision_resolution
// check the link above for more ways to resolve hash collisions

// so basically in some cases hash tables can have O(n) big o 

// Map and Set are new es6 syntax that allow us to use different datatype to map an object
// const a = new Map() 
// const b = new Set()

// createing our own hash table

class HashTable {
    constructor(size) {
        this.data = new Array(size);
    }
    //underscore indicates a private method
    //our hash function allocate memory using the encoding provided by the charCodeAt
    //the memory allocated determine where it will save the data by converting the key to bunch of numbers
    // this just basically is an example of how allocating memory might work
    _hash(key) {
        let hash = 0; 
        for (let i=0; i < key.length; i++){
            //charCodeAt() method return an integer between
            //0 and 65535 represting utf-16 code
            hash = (hash + key.charCodeAt(i)*i) % this.data.length
        }
        return hash;
    }
    // set method 
    set(key, value) {
        //store this data inside the address space created by hash function
        let address = this._hash(key)
        // to check collisions we use the check below
        if (!this.data[address]) {
            this.data[address] = []; 
            this.data[address].push([key, value])
            console.log(this.data)
        } else {
            //if we dont have the else we would have collision and lose our data 
            // this code here prevent collisions from happening to check just comment it out 
            //and check the console logs
            
            this.data[address].push([key, value]) 
            return this.data
        }
        //getter method where we use the key to extract the value
       
    }
    get(key) {
//first of to extract info we need to be at the correct address
// now we need to loop and grab the data
        let address = this._hash(key)
        const currentBucket = this.data[address];
        console.log(currentBucket)
        if (currentBucket) {
//do a for loop cause we might have multiple items 
            for(let i = 0; i <currentBucket.length; i++) {
                if(currentBucket[i][0] === key) {
                    console.log(currentBucket[i][1])
                    return currentBucket[i][1]
                }
            }
        } else {
            return undefined
        }
    }
}
const myHashTable = new HashTable(50);
myHashTable.set('grapes', 10000);
// myHashTable.set('grapes', 11); this will cause collision unless we have the else statement 
myHashTable.set('apples', 11);

myHashTable.get('grapes')
myHashTable.get('apples')
