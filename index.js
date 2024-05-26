const express = require('express') //import express package 
const mongoose = require('mongoose') //import express package
let dotenv = require('dotenv') //import dotenv package 
const Question = require('./models/question') //import the question model from the question file
const app = express() //initialize the express app 
const PORT = 8080 

require('dotenv').config() //initialize dotenv package, this will read the .env file and parse the contents, then assign it to process.env

//need middleware to parse the body of the request 
app.use(express.json()) //parse json data, now every request that comes in will first go through this middleware

//db connection after initializing express app and before routes 
mongoose.connect(process.env.DB_CONNECTION)
.then((res) => {console.log('Connected to DB')})
.catch((err) => {console.log(`Connection to db failed: ${err}`)})

//routes for questions
app.get('/questions/:category', async (req, res) => {
    try{
        const questions = await Question.find({category: req.params.category}) //find all questions with the category that was passed in the request
        res.status(200).json(questions)//send the questions as a json object
    } catch(err){
        res.status(500).json({message: err.message}) //send a status code and a message if an error occurs

    }
})


//routes for tshirts (this was for learning purposes)
app.get('/tshirt', (req, res) => { //run this function when the route is requested 
    res.status(200).send({ //can send a status code and a data payload 
        //passing js object, will pass as json 
        tshirtt: '👕',
        size: 'large'
    })
}) 

app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params; //get the id from the request parameters
    const { logo } = req.body; //get the logo from the request body

    if(!logo){
        res.status(418).send({message: 'We need a logo!'}) //send a status code and a message
    }

    res.send({
        tshirt: `👕 with your ${logo} and ID of ${id}`, //send a message with the id and logo
    })

})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
