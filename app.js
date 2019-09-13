require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const User = require('./models/user')
const Submission = require('./models/submission')
const userRouter = require('./controllers/users')
const config = require('./utils/config')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true})
    .then(()=> {
        console.log('connected to MongoDb')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    }) 


app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())

app.use('/userdata', userRouter)

module.export = app



