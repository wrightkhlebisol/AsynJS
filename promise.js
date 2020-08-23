console.log("Before");
const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(1)
        reject(new Error('Cant get promised value🤧☹️'))
    }, 3000);
})
console.log("After");

p.then(res => console.log("Result:", res)).catch(err => console.error('Error:', err.message));
