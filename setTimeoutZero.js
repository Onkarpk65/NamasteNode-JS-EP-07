console.log("Hello world!");

var a = 1078;
var b = 2098;

setTimeout(() => {
    console.log("call me right now");
}, 0);


setTimeout(() => {
    console.log("call me after 3 seconds");
}, 3000)

function multiplyFn(x, y) {
    const result = a * b; 
    return result;
}

var c = multiplyFn(a, b);

console.log("Multiplication result is : ", c);
