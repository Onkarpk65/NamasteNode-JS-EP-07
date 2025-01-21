# NamasteNode-JS-EP-07: SYNC VS ASYNC & THE MAGIC OF "SETTIMEOUT 0" - CODE EDITION
- This is the 7th episode of season one Namaste NodeJS, in this we will be see how sync, async, setTimeout zero works in actual code.


```javascript
fs.readFileSync("./file.txt", "utf8");


console.log("Hello world!");

//This function reads the contents of the file synchronously, meaning it will actually block the main thread while it's running
```

## What does blocking the main thread actually means ?

- The V8 engine is responsible for executing the JS code, but it cannot offload this task to **Libuv** (which handles asynchronous operations like I/O tasks).
- Think of it like an ice cream shop where the owner insists on serving each customer one at a time, without moving on to the next one until the current customer has been fully served. This is what happens when we use synchronous methods like `fs.readFileSync()`. 
- the main thread is blocked until the file is completely read.

## Why is this important?
- As a developer, it's important to understand that while Node.js and the V8 engine give us the capability to block the main thread using synchronous methods, this is generally not recommended. 
- **Synchronous methods** like `fs.readFileSync()` are still available in Node.js, but using them can cause performance issues because the code execution will be halted at that point until the file reading operation is complete.

## Best Practice:
- **Avoid using synchronous methods** in production code whenever possible, especially in performance critical situations, because they can slow down our application by blocking the main thread.
- Instead, use asynchronous methods like `fs.readFile()` that allow other operations to continue while thefile is being read, keeping the application responsive. 



## Introducing the `crypto` Module:
- Node.js has a core library known as `crypto`, which is used for cryptographic operations like generating secure keys, hashing passwords, and more. 
- The `crypto` module is one of the core modules provided by Node.js, similar to other code modules like `https`, `fs` and `zlib`.
- These core modules are built into Node.JS, so when we write `require('crypto')`, we are importing a module that is already present in Node.js.
- We can also import it using `require('node:crypto')` to explicitly indicate that it's a core module, but this is optional.


## Example of Blocking Code with `crypto`:
- One of the functions provided by the `crypto` module is `pbkdf2Sync`, which stands for **Password Based Key Derivation Function 2**.
- This function is used to generate a cryptographic key from a password and salt, and it operates synchronously.


```javascript
const crypto = require('node:crypto');

// Synchronous function - will BLOCK THE MAIN THREAD - DO NOT USE IT
crypto.pbkdf2Sync("password", "salt", 5000, 50,"sha512");
console.log("First key is generated");

//Async Function 
crypto.pbkdf2("password", "salt", 5000, 50,"sha512", (err, key) => {
    console.log("Second Key is generated");
})


```

> The first key is generated first because it's synchronous, while the second key is generated afterwards because it's asynchronous.



## Here's what this function does:
- **Password and Salt:** We provide a password and a salt value, which are combined to create a cryptographic key.
- **Iterations:** We specify the number of iterations (e.g., 5000) to increase the complexity of the key, making it harder to crack.
- **Key Length:** We definne the length of the key (e.g., 50 bytes). 
- **Digest Algorithm:** We choose a digest algorithm. like `sha512`, which determines how the key is hashed.
- **Callback:** In the asynchronous version (`pbkdf2`), a callback is provided to handle the result once the key is generated.


## Important Note: 
> When we see `Sync` at the end of the function name (like `pbkdf2Sync`), it means that the function is **synchronous** and will block the main thread while it's running. 
> This is something we should be cautious about, especially in performance sensitive applications. 


## Why Does This Matter? 
- **Blocking Behaviou:** The synchronous version of `pbkdf2` (`pbkdf2Sync`) will block the event loop, preventing any other code from executing until the key generation is complete. This can cause our application to become unresponsive if used inappropriately.
- **Asynchronous Alternative:** NodeJS also provides an asynchronous version (`pbkdf2` without the `Sync` suffix), which offloads the operation to **Libuv**. 
- This allows the event loop to continue processing other tasks while the key is being generated. 

## New Interesting Concept: `setTimeout(0)`

## What will be the output of the following code? 

```javascript
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

```

## Answer:

```javascript
Hello world!
Multiplication result is :  2261644
call me right now
call me after 3 seconds
```

## Why is `setTimeout(0)` executed after the multiplication result?
- You might wonder why the `setTimeout(0)` callback is executed after the other code, like the multiplication result, even though we set the delay to 0 ms.

## The Reason:
- **Asynchronous Operation:** `setTimeout` is an *asynchronous function*, meaning it doesn't block the execution of the code. When we call `setTimeout`, the callback function is passed to **Libuv** , which manages asynchronous operations.
- Libuv is Node.js's underlying library.
- **Event loop and CallStack:** The callback function from `setTimeout(0)` is added to the event queue. But, it won't be executed until the current *callstack* is empty. This means that even if we specify a 0 millisecond delay, the callback will only execute after the *global execution context is exhausted*.
- **Trust Issues with `setTimeout(0)`:** When we ask the code to run after 0 milliseconds, it doesn't necessarily run immediately after that time. 
- It runs *only when the call stack is empty*.
- This introduces some "terms and conditions" meaning that the actual execution timing is dependent on the state of the call stack.