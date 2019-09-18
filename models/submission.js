const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    name: String,
    description: String,
    text: String,
    course: String,
    date: String
    
})

submissionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.export = mongoose.model('Submission', submissionSchema)