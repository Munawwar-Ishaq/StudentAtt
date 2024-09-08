const mongoose = require('mongoose');

const Schema  = new mongoose.Schema({
    date : String,
    userID : String,
    classname : String,
    rollNo : Number,
    status : String,
    name : String,
    reason : String,
    leaveType : String,
});

const model = mongoose.model('Reports' , Schema);

module.exports = model;