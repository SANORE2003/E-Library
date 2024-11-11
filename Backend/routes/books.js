const express = require('express');
const Book = require('../models/Book');
const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get a single book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).send('Book not found');
        res.json(book);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Add a new book
router.post('/', async (req, res) => {
    const book = new Book(req.body);
    try {
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
