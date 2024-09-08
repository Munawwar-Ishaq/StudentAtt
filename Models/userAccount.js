const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const Schema  = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    profilePicture: String,
    classes : String,
    rollNo : Number,
    isLogin : Boolean,
    isAdmin : Boolean,
    attendenceMarked : {
        type : Boolean,
        default : false,
    }
}, {
    timestamps : true
});

const model = mongoose.model('StudentAccount' , Schema);

module.exports = model;