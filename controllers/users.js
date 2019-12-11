const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


app.use('/api/users', usersRouter)