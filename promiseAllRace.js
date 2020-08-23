const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            key: "value"
        })
    }, 2000)
});

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error("Error message"))
    }, 3000)
})

Promise.all([p1, p2]).then((res) => {
    console.log(res)
}).catch(err => console.log(err.message))
