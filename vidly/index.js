let express = require('express');
let Joi = require('joi');
let genres = require('./routes/genres');

let app = express();
app.use('/api/genres', genres);

app.use(express.json());

const genres = []



const port = process.env.PORT || 3000;
app.listen(port, console.log("App listening on port 3000"))
