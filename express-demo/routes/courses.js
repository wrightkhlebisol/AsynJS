const express = require('express');
const router = express.Router();

const courses = [{
        id: 1,
        name: "course1",
    },
    {
        id: 2,
        name: "course2",
    },
    {
        id: 3,
        name: "course3",
    },
];

router.get("/", (req, res) => {
    res.send(courses);
});

router.get("/:id", (req, res) => {
    let course = findCourse(req.params.id);
    if (!course) {
        res.status(404).send("Course with given id not found");
        return;
    }
    res.status(200).send(course);
});

router.post("/", (req, res) => {
    let {
        error
    } = validateCourse(req.body.name);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };

    courses.push(course);
    res.status(200).send(course);
});

router.put("/:id", (req, res) => {
    let course = findCourse(req.params.id);
    if (!course) {
        res.status(404).send("Course with given id not found");
        return;
    }

    let {
        error
    } = validateCourse(req.body.name);

    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.status(200).send(course);
});

router.delete("/:id", (req, res) => {
    let course = findCourse(req.params.id);
    if (!course) {
        res.status(404).send("Course with given id not found");
        return;
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.status(200).send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
    });

    return schema.validate({
        name: course,
    });
}

function findCourse(courseId, res) {
    return courses.find((c) => c.id === parseInt(courseId));
}

module.exports = router;
