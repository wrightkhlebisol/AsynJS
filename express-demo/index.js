const express = require("express");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const appDebug = require("debug")("app:startup");
const dbDebug = require("debug")("app:db");
// Router files
const courses = require("./routes/courses");
const home = require('./routes/home');

// Configuration
// console.log(`Application name: ${config.get("name")}`);
// console.log(`Application mail host: ${config.get("mail.host")}`);
// console.log(`Application mail pass: ${config.get("mail_pass")}`);
const app = express();
const {
    log,
    auth,
    logEnv
} = require("./middleware/logger");

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(helmet());
// app.use(express.static("public"));
app.use('/api/courses', courses);
app.use('/', home);

if (app.get("env") === "development") {
    app.use(
        morgan(
            `:remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"`
        )
    );
    appDebug("Morgan Enabled in development");
}
dbDebug("Connected to database");
// console.log(app.get("env"));

// app.use(log);
app.use(logEnv);
// app.use(auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on localhost:${port}`));
