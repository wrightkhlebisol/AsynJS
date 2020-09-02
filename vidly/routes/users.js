const {
    route
} = require('./genres');

let router = require('express')();

router.get('/', (req, res) => {
    res.status(200).send('All users')
})
