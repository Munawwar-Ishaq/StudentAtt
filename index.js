const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Route = require('./Routes')
const app = express();
require('dotenv').config();
const DB_CONNECTION = require('./config/dbConnection');
const { AutoAttendance , AllowMarkInNextDay } = require('./Function');

// DataBase Connection Configuration
DB_CONNECTION();

// Auto Attendance 
AutoAttendance();

// Allow Mark In Next Day 
AllowMarkInNextDay();

// Configure CORS with specific origins
app.use(cors({
    origin: ['https://student-att.netlify.app', 'http://localhost:3000'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true 
}));


app.use(bodyParser.json({limit : '50mb'}));

app.use(bodyParser.urlencoded({ extended: true, limit : '50mb'}));

app.use('/api/v1' , Route);

app.get('/' , function(req, res){
    res.send('Hello World!');
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



  