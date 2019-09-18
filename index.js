require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())

//Get

// Kaikkien käyttäjien data
// app.get('/userdata', (req,res) => {
//     User.find({}).then(users => {
//         res.json(users.map(user => user.toJSON()))
//     })
// })
// // Yksittäisen käyttäjän data IDn perusteella
// app.get('/userdata/:id', (req,res) => {
//     User.findById(req.params.id).then(user => {
//         if (user) {
//             return res.json(user.toJSON())
//         } else {
//             res.status(404).end()
//         }
//     })
//     .catch(error => next(error))
// }) 
// //Yksittäisen käyttäjän lisääminen
// app.post('/userdata', (req,res) => {
//     const body = req.body

//     if(body.name === undefined) {
//         return res.status(400).json({error: 'content missing'})
//     }

//     const user = new User({
//         name: body.name,
//         admin: false,
//         submissions: []
//     })

//     user.save().then(savedUser => {
//         res.json(savedUser.toJSON())
//     })
// })
// // Lisää submissionin
// app.post('/userdata/:id/submissions', (req,res) => {

//     const id = req.body.id
//     User.findOne({'_id':id}, ())
// }) 
// // Poistaa yksittäisen käyttäjän IDn mukaan
// app.delete('/userdata/:id', (req,res, next) => {
//     User.findByIdAndRemove(req.params.id)
//         .then(result => {
//             res.status(204).end()
//         })
//         .catch(error => next(error))
// })
// // Defaultti 
// app.get('/', (req, res) => {
//     res.send('<h1>Hello world!<h1>')
// })
// // Error handler tilanteeseen, jossa ID ei ole oikeassa formaatissa.

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const submissionSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 2,
        required: true
    },
    description: {
        type: String,
        minlength: 10,
        required: true
    },
    date: String,
    text: String,
    course: String,
    user: String,
})

const Submission = mongoose.model('Submission', submissionSchema)

submissionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

app.get('/submissions' ,(req,res) => {
    Submission.find({}).then(submissions => {
        res.json(submissions.map(submission => submission.toJSON()))
    })
})

app.get('/submissions/:id', (req,res,next) => {
    Submission.findById(req.params.id)
        .then(submission => {
            if (note) {
                res.json(submission.toJSON())
            } else {
                res.status(404).end()
            }
        })
        .catch(error => {
            next(error)
        })
})
app.post('/submissions', (req,res,) => {

    const body = req.body

    if (body.name === undefined) {
        return res.status(400).json({ error: 'content missing' })
    }

    const submission = new Submission({
        name: body.name,
        description: body.description,
        date: body.date,
        text: body.text,
        course: body.course,
        user: body.user,
    })

    submission.save().then(savedSubmission => {
        res.json(savedSubmission.toJSON())
    })
})

app.delete('/submissions/:id', (req,res,next) => {
    Submission.findByIdAndRemove(req.params.id) 
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.put('/submissions/:id', (req, res, next) => {
    const body = req.body

    const submission = {
        name: body.name,
        description: body.description,
        date: body.date,
        text: body.text,
        course: body.course,
        user: body.user,   
    }

    Submission.findByIdAndUpdate(req.params.id, submission, {new: true})
        .then(updatedSubmission => {
            res.json(updatedSubmission.toJSON())
        })
        .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
     console.error(error.message)

    if(error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
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

