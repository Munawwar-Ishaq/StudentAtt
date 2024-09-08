const Attendance = require("../Models/attendence");
const jwt = require("jsonwebtoken");

const Controller = (req, res) => {

  console.log('All Attendance Request');
  

  const { token } = req.body;

  jwt.verify(token, process.env.JWT_SCRET, async (err, id) => {
    if (err) return res.json({ status: 401, error: "Invalid token" });

    const findAttendance = await Attendance.find({
      userID: id,
    }).select('date mark');

    res.json({ status: 200, data: findAttendance });
  });
};

module.exports = Controller;
