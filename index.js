<<<<<<< HEAD
<<<<<<< HEAD
const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
=======
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
>>>>>>> parent of b316c5d... MongoDB enabled
=======
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const User = require('./models/user')
const Submission = require('./models/submission')
app.use(bodyParser.json())
app.use(cors())
>>>>>>> parent of 62c0590... toimimaton uusi versio


<<<<<<< HEAD
<<<<<<< HEAD
const server = http.createServer(app)

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})
=======
let userData = [
    {
        id: 0,
        name: "Ukko Kamula",
        admin: true,
        submissions: [
            {
                submission_id: 0,
                name: "KaY - Nettisivut",
                text: "lorem dolor damen dumen jaaba jaabadiibadaaba",
                date: "05.12.31",
                private: false,
            },
            {
                submission_id: 1,
                name: "KaY - Nettisivut",
                text: "lorem dolor damen dumen jaaba jaabadiibadaaba",
                date: "05.12.31",
                private: false,
            },
            {
                submission_id: 2,
                name: "KaY - Nettisivut",
                text: "lorem dolor damen dumen jaaba jaabadiibadaaba",
                date: "05.12.31",
                private: false,
            }
        ]
        
    },
    {
        id: 1,
        name: "Ukko Kamula",
        admin: true,
        submissions: [
            {
                submission_id: 0,
                name: "KaY - Nettisivut",
                text: "lorem dolor damen dumen jaaba jaabadiibadaaba",
                date: "05.12.31",
                private: false,
            },
            {
                submission_id: 1,
                name: "KaY - Nettisivut",
                text: "lorem dolor damen dumen jaaba jaabadiibadaaba",
                date: "05.12.31",
                private: false,
            }
        ]
        
        
    },
    {
        id: 2,
        name: "Ukko Kamula",
        admin: true,
        submissions: []
        
    },
    {
        id: 3,
        name: "Ukko Kamula",
        admin: true,
        submissions: []
        
    },
]

const generateId = () => {
    const maxId = userData.length > 0
        ? Math.max(...userData.map(n => n.id))
        : 0
    return maxId + 1;
}

const generatePostId = (userId) => {
    const maxId = userData[userId].submissions.length > 0
        ? Math.max(...userData[userId].submissions.map(n => n.submission_id))
        : 0

    return maxId +1
}

app.get('/userdata/:id', (req, res) => {
    const id = Number(req.params.id)
    const user = userData.find(user => user.id === id)
    console.log(typeof user)

    if (user) {
        res.json(user)    
    } else {
        res.status(404).end()
    }
}) 

app.post('/userdata', (req,res) => {
    const body = req.body

    if (!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    } 

    const user = {
        id: generateId(),
        name: body.name,
        admin: false,
        submissions: [],
    }

    userData = userData.concat(user)

    res.json(userData)
})

app.post('/userdata/:id/submissions', (req,res) => {
    const id = Number(req.params.id)
    const body = req.body
    const submission = {
        submission_id: generatePostId(id),
        name: body.name,
        text: body.text,
        date: new Date(),
        private: true
    }
   
    userData[id].submissions = userData[id].submissions.concat(submission)

    res.json(userData[id].submissions)

}) 

app.delete('/userdata/:id', (req,res) => {
    const id = Number(req.params.id)
    userData = userData.filter(user => user.id !== id) 

    res.status(204).end()
})

app.get('/', (req, res) => {
    res.send('<h1>Hello world!<h1>')
})

app.get('/userdata', (req,res) => {
    res.json(userData)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`DIMU demosaitti on livenä portissa ${PORT}`)
})
>>>>>>> parent of b316c5d... MongoDB enabled
=======

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
        admin: false,
        submissions: submissionSchema
    })

    user.save().then(savedUser => {
        res.json(savedUser.toJSON())
    })
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
// Error handler tilanteeseen, jossa ID ei ole oikeassa formaatissa.
const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if(error.name === 'CastError' && error.kind == 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    }
}

// Otetaan middleware käyttöön
app.use(errorHandler)
// Käynnistetään serferi envioronmental muuttujien perusteella 
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`DIMU demosaitti on livenä portissa ${PORT}`)
})
>>>>>>> parent of 62c0590... toimimaton uusi versio
