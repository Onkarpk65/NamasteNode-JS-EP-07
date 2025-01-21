const fs = require('fs');
const https = require('https');

console.log("Hello World");

var a = 10;
var b = 20;

// synchronous
fs.readFileSync("./gossip.txt")
console.log("this will execute only after file read");

https.get("https://dummyjson.com/products/1", (res) => {
    console.log("fetched data successfully");
});

setTimeout(() => {
    console.log("setTimeout called after 5 seconds");
}, 5000);

//Async function 
fs.readFile("./gossip.txt", (err, data) => {
    console.log("File Data: ", data);
});

function multiplyFn(x, y) {
    const result = a * b; 
    return result;
}


var c = multiplyFn(a, b);
