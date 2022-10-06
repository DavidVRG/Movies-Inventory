const mongoose = require('mongoose')

const addMovie = new mongoose.Schema({
    movieName: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Movies', addMovie)