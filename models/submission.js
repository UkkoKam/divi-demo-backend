const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    headline: String,
    shortDesc: String,
    makers: Array,
    year: Number,
    published: Date,
    public: Boolean,
    imgUrls: Array,
    MainContent: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

submissionSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.export = mongoose.model('Submission', submissionSchema)