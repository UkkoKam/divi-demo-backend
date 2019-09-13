require('dotenv').config()
const mongoose = require('mongoose')



const submissionSchema = new mongoose.Schema({
    name: String,
    course: String,
    date: String,
    description: String,
    text: String,
    pictures: Array
    
})

submissionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Submission', submissionSchema)

