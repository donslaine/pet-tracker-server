const express = require('express')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

const Pet = require('../models/pet')

const router = express.Router()

// INDEX
// GET /characters
router.get('/pets', requireToken, (req, res, next) => {
    Pet.find()
        .then(pets => {
            return pets.map(pet => pet)
        })
        .then(pets => {
            res.status(200).json({ pets: pets })
        })
        .catch(next)
})

// SHOW
// GET /characters/:id
router.get('/pets/:id', requireToken, (req, res, next) => {
    Pet.findById(req.params.id)
        .then(handle404)
        .then(pet => {
            res.status(200).json({
                pet: pet
            })
        })
        .catch(next)
})

// create paths
// POST /pet
router.post('/pets', requireToken, (req, res, next) => {
    Pet.create(req.body.pet)
        .then(pet => {
            res.status(201).json({ pet: pet })
        })
        .catch(next)
})

// UPDATE
// PATCH /pets/:id
router.patch('/pets/:id', requireToken, (req, res, next) => {
    Pet.findById(req.params.id)
        .then(handle404)
        .then(pet => {
            return pet.updateOne(req.body.pet)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /pets/:id
router.delete('/pets/:id', requireToken, (req, res, next) => {
    Pet.findById(req.params.id)
        .then(handle404)
        .then(pet => {
            return pet.deleteOne()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router