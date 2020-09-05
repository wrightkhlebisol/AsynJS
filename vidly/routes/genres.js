let router = require('express')();
let {
    Genres
} = require('../models/genres')

router.get("/", async (req, res) => {

    try {
        let genres = await Genres.find();
        if (genres) {
            res.status(200).send(genres)
        } else {
            res.status(404).send("No genres found");
        }
    } catch (err) {
        res.status(400).send(err.message)
        console.log("Err:", err.message)
    }
});

router.get("/:id", async (req, res) => {
    try {
        let genre = await Genres.findById(req.params.id);
        res.status(200).send(genre);
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post("/", async (req, res) => {
    let genre = new Genres({
        name: req.body.name
    });
    try {
        await genre.save();
        res.status(200).send(genre)
    } catch (err) {
        console.log(err.message)
        res.status(400).send(err.message)
    }
});

router.put("/:id", async (req, res) => {
    try {
        const genre = await Genres.findByIdAndUpdate(req.params.id, {
            name: req.body.name
        }, {
            new: true,
            useFindAndModify: false
        })
        if (genre) res.status(200).send(genre);

    } catch (err) {
        res.status(400).send(err.message)
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let genre = await Genres.findByIdAndDelete(req.params.id, {
            name: req.body.name
        })
        res.status(200).send(genre);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;
