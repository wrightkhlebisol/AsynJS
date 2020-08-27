const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercise', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connection successful"))
    .catch((err) => console.log(err))

let courseSchema = mongoose.Schema({
    tags: [String],
    date: {
        type: Date,
        default: Date.now(),
    },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
})

const Course = mongoose.model('Course', courseSchema);

async function getAllCourse() {
    return await Course
        .find({
            isPublished: true,
            tags: 'backend'
        })
        .sort({
            name: 1
        })
        .select({
            name: 1,
            author: 1
        })
}

async function solveExcer2() {
    return await Course
        .find({
            isPublished: true,
            tags: {
                $in: ['frontend', 'backend']
            }
        })
        .sort({
            price: -1
        })
        .select('name author price')
}

async function getPubGte15() {
    return await Course
        .find({
            isPublished: true
        }).or({
            price: {
                $gte: 15
            }
        }, {
            name: /.*by.*/
        })
}

async function updateCourse(id) {
    console.log(id);
    const course = await Course.find({
        _id: id
    });
    // return course;
    console.log(course);
    if (!course) return;
    console.log(course);
    course.isPublished = true;
    course.author = "Another Author";

    const result = await course.save();
    console.log(result);
}

updateCourse('5a68fe2142ae6a6482c4c9cb').catch(e => console.log(e.message));
