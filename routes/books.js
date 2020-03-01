const express = require('express')

const router = express.Router()

const books = [
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

// ALL
router.get('/', (req, res) => {
    res.status(200).json(books)
})

// GET BY ID
router.get('/:id', (req, res) => {
    let book = books.find(b => b.id === parseInt(req.params.id))
    if(!book)
        return res.status(404).json({message: `Book with id ${req.id} not found`})
    res.status(200).json(book)
})


module.exports = router