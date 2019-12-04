const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    submissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Submission'
        }
    ]
})

const User = mongoose.model('User', userSchema)

module.exports = User