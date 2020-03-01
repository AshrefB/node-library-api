const express = require('express')
const joi = require('joi')

const router = express.Router()

var books = [
    {
        id: 1,
        name: 'Book 1',
        description: 'Description for book 1',
        imageUrl: 'http://www.example.com/img1',
        author: {
            firstName: 'fn author 1',
            lastName: 'ln author 1',
            nbBooks: 1
        },
        sources: ["source 1", "source 2", "source 3"]
    },
    {
        id: 2,
        name: 'Book 2',
        description: 'Description for book 2',
        imageUrl: 'http://www.example.com/img2',
        author: {
            firstName: 'fn author 2',
            lastName: 'ln author 2',
            nbBooks: 3
        },
        sources: ["source 1", "source 2", "source 3"]
    }
]

const bookValidator = {
    id: joi.number(),
    name: joi.string().min(3).required(),
    description: joi.string(),
    imageUrl: joi.string().uri().required(),
    author: {
        firstName: joi.string().min(3).required(),
        lastName: joi.string().min(3).required(),
        nbBooks: joi.number().positive()
    },
    sources: joi.array()
}

// ALL
router.get('/', (req, res) => {
    res.status(200).json(books)
})

// GET BY ID
router.get('/:id', (req, res) => {
    let book = books.find(b => b.id === parseInt(req.params.id))
    if(!book)
        return res.status(404).json({message: `Book with id ${req.params.id} not found`})
    res.status(200).json(book)
})

// ADD
router.post('/', (req, res) => {
    let book = {
        id: books.length + 1,
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        author: req.body.author,
        sources: req.body.sources
    }

    let resValidator = joi.validate(book, bookValidator)
    if(resValidator.error)
        return res.status(400).json({message: resValidator.error.details[0].message})

    books.push(book);
    res.status(201).json(book)
})

// UPDATE
router.put('/:id', (req, res) => {
    let index = books.findIndex(b => b.id === parseInt(req.params.id))

    if(index === -1)
        return res.status(404).json({message: `Book with id ${req.params.id} not found`})
    
    let book = {
        id: parseInt(req.params.id),
        name: req.body.name,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        author: req.body.author,
        sources: req.body.sources
    }

    let resValidator = joi.validate(book, bookValidator)
    if(resValidator.error)
        return res.status(400).json({message: resValidator.error.details[0].message})

    books[index] = book
    res.status(200).json(book)
})

// DELETE
router.delete('/:id', (req, res) => {
    let book = books.find(b => b.id === parseInt(req.params.id))

    if(!book)
        return res.status(404).json({message: `Book with id ${req.params.id} not found`})

    books = books.filter(b => b !== book)
    res.status(200).json(book)
})


module.exports = router