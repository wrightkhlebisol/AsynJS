const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://root:root@cluster0.wt52t.mongodb.net/playground?retryWrites=true", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'))

let authorSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    bio: String,
    website: String
})


let courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: authorSchema
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Author'
    // }
});

const Author = mongoose.model('Author', authorSchema);
const Course = mongoose.model('Course', courseSchema);

async function createAuthor() {
    let author = new Author({
        name: "New wright",
        bio: "Tell them story",
        website: "new.com"
    })
    try {
        let _author = await author.save();
        console.log(author)
    } catch (error) {
        console.log(error)
    }
}

async function createCourse(name, author) {
    const course = new Course({
        name,
        author
    });

    try {
        const result = await course.save();
        console.log(result)
    } catch (ex) {
        console.log(ex.message)
    }
}

async function listCourses() {
    const courses = await Course
        .find()
        .populate('author')
        .select('name author');
    console.log(courses);
}

// createCourse('Node Course', new Author({
//     name: 'Mosh'
// }));
// createAuthor()
listCourses()
