const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')

const db = require('./config.db')
const PORT = 8000

const petRoutes = require('./routes/pet_routes')

// deprecation warning
mongoose.set('strictQuery', true)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors({ origin: `http://127.0.0.1:5500` }))

app.use(express.json())

app.use(petRoutes)

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})

module.exports = app