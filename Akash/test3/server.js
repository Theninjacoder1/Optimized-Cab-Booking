// server.js
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3019

const app = express()
app.use(express.static(__dirname))
app.use(express.urlencoded({extended: true}))

mongoose.connect('mongodb://localhost:27017/students')

const db = mongoose.connection
db.once('open', () => {
    console.log('Connected to MongoDB successfully')
})

// Original user schema
const userSchema = new mongoose.Schema({ 
    name: String,
    phone: Number,
    password: String,
})

// New driver schema
const driverSchema = new mongoose.Schema({
    fullName: String,
    contactNumber: Number,
    email: String,
    licenseNumber: String,
    vehicleType: String,
    vehicleNumber: String,
    address: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("data", userSchema)
const Driver = mongoose.model("driver", driverSchema)

// Existing routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'))
})

app.post('/post', async (req, res) => { 
    const user = new User({
        name: req.body.name,
        phone: req.body.phone,
        password: req.body.password,
    })
    await user.save()
    res.send("Data Inserted Successfully")
})

// New driver routes
app.get('/driver', (req, res) => {
    res.sendFile(path.join(__dirname, 'driver.html'))
})

app.post('/driver/register', async (req, res) => {
    try {
        const driver = new Driver({
            fullName: req.body.fullName,
            contactNumber: req.body.contactNumber,
            email: req.body.email,
            licenseNumber: req.body.licenseNumber,
            vehicleType: req.body.vehicleType,
            vehicleNumber: req.body.vehicleNumber,
            address: req.body.address
        })
        await driver.save()
        res.send("Driver Registration Successful")
    } catch (error) {
        console.error(error)
        res.status(500).send("Error registering driver")
    }
})

app.listen(port, () => {
    console.log("Server started on port", port)
})