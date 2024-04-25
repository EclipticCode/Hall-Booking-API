const express = require ('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const bodyParser = require ('body-parser')
app.use(bodyParser.json())


const roomDetails = [];
const customerDetails = [];

// API for Q1) Creating a room
app.post('/createroom' , (req,res) => {
    roomDetails.push({
        numberOfSeatsAvailable : req.body.seats ,
        amenitiesInRoom : req.body.amenities ,
        priceForOneHour : req.body.price
    })
    res.send(roomDetails)
})

// API for Q2) Booking a room
app.post('/bookroom' , (req,res) => {
     customerDetails.push({
       customerName : req.body.name ,
       bookedDate : req.body.date , 
       startTime : req.body.startTime ,
       endTime : req.body.endTime ,
       roomName : req.body.roomName , 
       bookedStatus : req.body.bookedStatus ,  
       roomID : req.body.roomID
  })
    res.send(customerDetails)
})

// API for Q3) List all rooms with booked data
app.get('/roomslist' , (req,res) => {
    const status = "Yes" ;
    const roomsWithData = customerDetails.filter(e => e.bookedStatus == status)
    res.send(roomsWithData)
})

// API for Q4) List all customers with booked data
app.get('/customerlist' , (req,res) => {
     const filteredCustomers = customerDetails.map(details => ({
        customerName : details.customerName ,
        roomName: details.roomName,
        bookedDate: details.bookedDate,
        startTime: details.startTime,
        endTime: details.endTime
     }))
     res.send(filteredCustomers)
})

// API for Q5) List how many times a customer has booked the room
app.get('/customercount/:name' , (req,res) => {
    const paramsName = req.params.name 
    const bookedCoustomer = customerDetails.filter(e => e.customerName == paramsName)
    res.send(`The customer ${paramsName} has booked the room for ${bookedCoustomer.length} times `)
    
})


app.get("/", (req,res) => {
    res.send("api working success")
})


app.listen(4004,()=>{
    console.log("Server started successfully")
})


