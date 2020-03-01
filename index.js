const express = require('express')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 3000


// MIDDLEWARES
if(app.get('env') === 'development') {
    app.use(morgan('tiny'))
}

// ROUTES

// SERVER
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))