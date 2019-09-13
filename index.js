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

app.use('/userdata', userRouter)

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
