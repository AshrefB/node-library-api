const express = require('express')

const router = express.Router()

const books = [
    {
        id: 1,
        name: 'Book 1',
        description: 'Description for book 1',
        imageUrl: 'http://www.example.com',
        author: {
            firstName: 'fn author 1',
            lastName: 'ln author 1',
            nbBooks: 1
        },
        sources: ["a", "b", "c"]
    },
    {
        id: 2,
        name: 'Book 2',
        description: 'Description for book 2',
        imageUrl: 'http://www.example.com',
        author: {
            firstName: 'fn author 2',
            lastName: 'ln author 2',
            nbBooks: 3
        },
        sources: ["a", "b", "c"]
    }
]

// ALL
router.get('', (req, res) => {
    res.status(200).json(books)
})

module.exports = router