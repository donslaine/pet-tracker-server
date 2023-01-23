const mongoose = require('mongoose')
const toySchema = require('./toy')

const Schema = mongoose.Schema

const petSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        species: {
            type: String,
            required: true
        },
        breed: {
            type: String,
            required: true
        },
        toys: [toySchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet