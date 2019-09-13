require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const User = require('./models/user')
const Submission = require('./models/submission')
app.use(bodyParser.json())
app.use(cors())



//Get

// Kaikkien käyttäjien data
app.get('/userdata', (req,res) => {
    User.find({}).then(users => {
        res.json(users.map(user => user.toJSON()))
    })
})
// Yksittäisen käyttäjän data IDn perusteella
app.get('/userdata/:id', (req,res) => {
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
app.post('/userdata', (req,res) => {
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
app.post('/userdata/:id/submissions', (req,res) => {
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
app.delete('/userdata/:id', (req,res, next) => {
    User.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})
// Defaultti 
app.get('/', (req, res) => {
    res.send('<h1>Hello world!<h1>')
})


// Yksittäisen käyttäjän tietojen muokkaukset

app.put('/userdata/:id', (req, res, next) => {
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

// Error handler tilanteeseen, jossa ID ei ole oikeassa formaatissa.
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if(error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {

        // estää kyllä pyynnön, muttei jostain syystä palauta mitään 
        // vaan selain / postman jää jumiin
        return res.status(400).send({ error: error.message })
    }

    next(error)
}

// Otetaan middleware käyttöön
app.use(errorHandler)
// Käynnistetään serferi envioronmental muuttujien perusteella 
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`DIMU demosaitti on livenä portissa ${PORT}`)
})