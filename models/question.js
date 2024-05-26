const mongoose = require('mongoose') //import mongoose package

//difine the schema for a question
let questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },

})

//export the model
let Question = mongoose.model('Question', questionSchema, 'couples_questions')
module.exports = Question  //export the model so it can be used in other files