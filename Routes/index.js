const express = require('express');
const RegisterController = require('../Controllers/RegisterController');
const LoginController = require('../Controllers/LoginController');
const LogoutController = require('../Controllers/LogoutController');
const UpdateAccountController = require('../Controllers/UpdateAccountController');
const LeaveReportController = require('../Controllers/LeaveReportController'); 
const UserDataController = require('../Controllers/UserDataController');
const MarkAttendanceController = require('../Controllers/MarkAttendanceController');
const AllAttendanceController = require('../Controllers/AllAttendanceController');
const GetleaveReportController = require('../Controllers/GetleaveReportController')

const Route = express.Router();

Route.post('/register' ,  RegisterController);
Route.post('/login' , LoginController);
Route.post('/logout/:id' , LogoutController);
Route.post('/updateAccount' , UpdateAccountController);
Route.post('/leaveReport' , LeaveReportController);
Route.post('/getleaveReport' , GetleaveReportController);
Route.post('/markAttendance' , MarkAttendanceController);
Route.post('/all-attendance' , AllAttendanceController);
Route.post('/userdata/:token' , UserDataController);

module.exports = Route;


