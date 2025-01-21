const crypto = require('crypto');

console.log("Hello world!");

var a = 1078;
var b = 209;

// pbkdf2 - Password Based Key Derivation Function



crypto.pbkdf2Sync("password", "salt", 5000, 50,"sha512");
console.log("First key is generated");

//Async Function 
crypto.pbkdf2("password", "salt", 5000, 50,"sha512", (err, key) => {
    console.log("Second Key is generated");
})


function multiplyFn(x, y) {
    const result = a * b; 
    return result;
}

var c = multiplyFn(a , b);

console.log("Multiplication result is : ", c);