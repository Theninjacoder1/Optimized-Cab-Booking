const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express ()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/students')

const db = mongoose.connection
db.once('open', () => {
    console.log('Connected to MongoDB sucesssss')
})

const userSchema = new mongoose.Schema({ 
    name: String,
    phone: Number,
    password: String,
    
})

const User = mongoose.model("data", userSchema)


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'))
})


app.post('/post',async (req, res) => { 
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
    })
    await user.save()
    console.log(user)
    res.send("Data Inserted Sucessfully Forms :)) now do other ")
})


app.listen(port, ()=>{

    console.log("Server started")

})


