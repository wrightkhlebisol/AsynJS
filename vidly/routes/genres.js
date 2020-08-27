let router = require('express')();

router.get("/", (req, res) => {
    if (genres.length !== 0) {
        res.status(200).send(genres);
    }
    res.status(404).send("No genres found");
});

router.post("/:id", (req, res) => {
    res.status(200).send("It works");
});

router.put("/:id", (req, res) => {
    res.status(200).send("It works");
});

router.delete("/:id", (req, res) => {
    res.status(200).send("It works");
});

module.exports = router;
