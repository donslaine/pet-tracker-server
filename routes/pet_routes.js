const express = require('express')

const Pet = require('../models/pet')

const router = express.Router()

//INDEX
// GET /characters
// router.get('/characters', (req, res, next) => {
//     Pet.find()
//         .then(pets => {
//             return pets.map(pet => pet)
//         })
// })

router.post('/pets', (req, res, next) => {
    Pet.create(req.body.pet)
        .then(pet => {
            res.status(201).json({ pet: pet })
        })
        .catch(next)
})

module.exports = router