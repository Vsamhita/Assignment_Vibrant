const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create blogs Schema & model
const blogsSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title field is required']
    },
    description: {
        type: String
    },
    author: {
        type: String
    },
    comments: {
        type: Array
    }
});

const Blogs = mongoose.model('blogs', blogsSchema);

module.exports = Blogs;