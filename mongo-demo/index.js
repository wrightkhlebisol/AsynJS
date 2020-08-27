const mongoose = require('mongoose');



let courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: {
        type: Date,
        default: Date.now
    },
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: "PHP",
        author: "Wright",
        tags: ['OOP', 'API'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result)
}

async function getCourse() {
    const courses = await Course
        .find({
            author: /^Wright/,
            isPublished: true
        })
        .limit(10)
        .sort({
            name: 1
        })
        .countDocuments()
    console.log(courses);
}

getCourse();
