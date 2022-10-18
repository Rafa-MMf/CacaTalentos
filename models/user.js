const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = Schema({
    email: {
        type: String,
        require: true,
    },
    senha: {
        type: String,
        require: true,
    },
    tipo: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("users", User)