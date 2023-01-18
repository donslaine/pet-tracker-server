const mongoose = require('mongoose')

const Schema = mongoose.Schema

const petSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        breed: {
            type: String,
            required: true
        },
        isfixed: {
            type: Boolean,
            nullable: true
        }
    },
    {
        timestamps: true
    }
)

const Pet = mongoose.model('Pet', petSchema)

module.exports = Pet