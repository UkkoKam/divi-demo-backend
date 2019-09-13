const userRouter = require('express').Router()
const User = require('../models/user')
const Submission = require('../models/submission')

//Get

// Kaikkien käyttäjien data
userRouter.get('/userdata', (req,res) => {
    User.find({}).then(users => {
        res.json(users.map(user => user.toJSON()))
    })
})
// Yksittäisen käyttäjän data IDn perusteella
userRouter.get('/userdata/:id', (req,res) => {
    User.findById(req.params.id).then(user => {
        if (user) {
            res.json(user.toJSON())
        } else {
            res.status(404).end()
        }
    })
    .catch(error => next(error))
}) 
//Yksittäisen käyttäjän lisääminen
userRouter.post('/userdata', (req,res) => {
    const body = req.body

    if(body.name === undefined) {
        return res.status(400).json({error: 'content missing'})
    }

    const user = new User({
        name: body.name,
        admin: body.admin,
        startingYear: body.startingYear,
        submissions: body.submissions
    })

    user.save().then(savedUser => {
        res.json(savedUser.toJSON())
    })
    .catch(error => next(error))
})
// Lisää submissionin
userRouter.post('/userdata/:id/submissions', (req,res) => {
    const body = req.body

    if(body.name === undefined) {
        return res.status(400).json({error: 'content missing'})
    }

    const submission = new Submission({
        name: body.name,
        course: body.course,
        date: body.date,
        description: body.description,
        text: body.text,
        pictures: body.pictures
    })

    submission.save().then(savedSubmission => {
        res.json(savedSubmission.toJSON())
    })
}) 
// Poistaa yksittäisen käyttäjän IDn mukaan
userRouter.delete('/userdata/:id', (req,res, next) => {
    User.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})
// Defaultti 
userRouter.get('/', (req, res) => {
    res.send('<h1>Hello world!<h1>')
})


// Yksittäisen käyttäjän tietojen muokkaukset

userRouter.put('/userdata/:id', (req, res, next) => {
    const body = req.body

    const user = {
        submissions: body.submissions,
        name: body.name,
        admin: body.admin   
    }

    User.findByIdAndUpdate(req.params.id, user, { new: true} ) 
        .then(updatedUser => {
            res.json(updatedUser.toJSON())
        })
        .catch(error => next(error))
})

module.exports = userRouter