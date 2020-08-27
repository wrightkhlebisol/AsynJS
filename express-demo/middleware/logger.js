let log = (req, res, next) => {
    console.log("Authenticating...");
    console.log("Final thing");
    console.log("Authenticating...2");
    console.log("Final thing..2");
    console.log("Authenticating...3");
    console.log("Final thing..3");
    next();
}

let auth = (req, res, next) => {
    console.log("Logging...");
    console.log("not logging!!!");
    next();
}

let logEnv = (req, res, next) => {
    console.info(JSON.stringify(process.env.NODE_ENV), __filename);
    next();
}

module.exports = {
    log,
    auth,
    logEnv
};
