const express = require('express')
const morgan = require('morgan')
const indexRouter = require('./routes/index')
const booksRouter = require('./routes/books')

const app = express()
const port = process.env.PORT || 3000


// MIDDLEWARES
app.use(express.json())
if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
}

// ROUTES
app.use('', indexRouter)
app.use('/api/books', booksRouter)

// SERVER
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))