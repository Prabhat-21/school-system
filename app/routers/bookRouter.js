const db = require("../models/index")
const express = require('express');
const router = new express.Router()
const books = db.books;


router.post('/books', async (req, res) => {
    const book = books.build(req.body);
    try {
        await book.save()
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/book/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const book = await books.findByPk(_id)

        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})



module.exports=router

    