const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    userID : String,
    username : String,
    profileImage : String,
    mark : Boolean,
    date : Date,
    class : String
});

const model = mongoose.model('Attendence' , Schema);

module.exports = model;