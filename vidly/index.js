let express = require('express');
let Joi = require('joi');
let mongoose = require('mongoose');

let genres = require('./routes/genres');
let customers = require('./routes/customers')

let app = express();

mongoose.connect("mongodb+srv://root:root@cluster0.wt52t.mongodb.net/vidly?retryWrites=true", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected")).catch(err => console.log(`DB not connected`, err.message))

app.use(express.json());

app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, console.log("App listening on port 3000"))
