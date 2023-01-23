const mongoose = require('mongoose')

const Schema = mongoose.Schema

const toySchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
)

module.exports = toySchema