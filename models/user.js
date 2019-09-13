require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url, {useNewUrlParser: true})
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB', error.message)
    })

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 4,
        required: true
    },
    admin: {
        type: Boolean,
        required: true
    },
    startingYear: {
        type: Number,
        required: true
    },
    submissions: {
        type: Array
    }
    
})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('User', userSchema)

