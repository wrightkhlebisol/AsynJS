getCustomer(1, (customer) => {
    console.log('Customer: ', customer);
    if (customer.isGold) {
        getTopMovies((movies) => {
            console.log('Top movies: ', movies);
            sendEmail(customer.email, movies, () => {
                console.log('Email sent...')
            });
        });
    }
});

try {
    async function sendTopMovies() {
        let customer = await getCustomer(1);
        let topMovies = await getTopMovies();
        let email = await sendEmail();
    }

    sendTopMovies();
} catch (e) {}


function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
        }, 4000);

    })
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);

    })
}

function sendEmail(email, movies) {
    return new Promise((reolve, reject) => {
        setTimeout(() => {
            reolve();
            console.log('Email sent...')
        }, 4000);
    })
}
