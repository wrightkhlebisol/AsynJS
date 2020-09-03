let express = require('express');
const config = require("config");
let Joi = require('joi');
let mongoose = require('mongoose');

let genres = require('./routes/genres');
let customers = require('./routes/customers')
let users = require('./routes/users')
let auth = require('./routes/auth')

let app = express();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1)
}

mongoose.connect(config.get('mongodb_url'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log("Database connected")).catch(err => console.log(`DB not connected`, err.message))

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/users', users);
app.use('/api/auth', auth)

const port = process.env.PORT || 3000;
app.listen(port, console.log("App listening on port 3000"))
