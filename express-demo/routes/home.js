const express = require('express');
let app = express();
let router = express.Router();
app.set('view engine', 'pug');
app.set('views', './views')

router.get("/", (req, res) => {
    res.render("index.pug", {
        title: "Page Title",
        message: "Message body",
    })
});

module.exports = router;
