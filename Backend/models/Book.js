const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    pdfLink: { type: String, required: true },
    image: { type: String, required: true }, // URL to book image
    genre: { type: String, required: true },
    summary: { type: String, required: true }
});

module.exports = mongoose.model('Book', bookSchema);
