const express = require('express')

const Pet = require('../models/pet')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

const router = express.Router()

// CREATE
// POST /toys
router.post('/toys', requireToken, (req, res, next) => {
    const petId = req.body.toy.petId

    console.log(req.user)

    const toy = req.body.toy
    // adding an 'owner' field

    // find the pet that I want to add the toy to
    // once found 'push' the toy into the mongoose Array
    // set a status of 201 created if success
    // next if failure
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            pet.toys.push(toy)

            // have to save the doc when modified
            pet.save()
        })
        .then(pet => {
            res.status(201).json({ pet: pet})
        })
        .catch(next)
})

// UPDATE
// PATCH /toys/:id
router.patch('/toys/:toyId', (req, res, next) => {
    const petId = req.body.toy.petId
    const toyBody = req.body.toy
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            // finding the toy by its Id
            const toy = pet.toys.id(req.params.toyId)

            // setting the new toy content to be the content passed in
            toy.set(toyBody)

            // I have modified the doc, I must save
            return pet.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

// DELETE
// DELETE /toys/:toyId
router.delete('/toys/:toyId', (req, res, next) => {
    const petId = req.body.toy.petId
    Pet.findById(petId)
        .then(handle404)
        .then(pet => {
            pet.toys.id(req.params.toyId).remove()

            return pet.save()
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})

module.exports = router