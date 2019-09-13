const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://UkkoKam:${password}@cluster0-nmddn.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const userSchema = new mongoose.Schema({
    name: String,
    text: String,
    admin: Boolean,
    submissions: Array,
})

const User = mongoose.model('User', userSchema)

const user = new User({
    name: 'Diiba Daabanen',
    text: 'lorem ipsum dolor samet yms yms jeejee rocknroll',
    admin: false,
    submissions: []
})

User.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
})

user.save().then(response => {
    console.log('user saved')
    mongoose.connection.close()
})
