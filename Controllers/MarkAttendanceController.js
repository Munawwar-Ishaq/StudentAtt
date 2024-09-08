const Attendance = require("../Models/attendence");
const UserAccount = require("../Models/userAccount");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Controller = (req, res) => {
  const { token, mark } = req.body;  

  jwt.verify(token, process.env.JWT_SCRET, async (err, id) => {
    if (err) return res.json({ status: 401, error: "Invalid token" });

    const findUser = await UserAccount.findById(id);

    if (!findUser) return res.json({ status: 404, error: "User not found" });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const findAttendance = await Attendance.findOne({
      userID: id,
      date: { $gte: startOfDay, $lte: endOfDay },
    });

    if (findAttendance) {
      return res.json({
        error: "You have already marked your attendance for today",
        status : 409
      });
    }
    
    const newAttendance = new Attendance({
      userID: id,
      username: findUser.name,
      profileImage: findUser.profilePicture,
      mark: mark,
      date: new Date(),
      class : findUser.classes
    });

    await newAttendance.save();

    findUser.attendenceMarked = true;
    await findUser.save();

    return res.json({ message: "Attendance marked successfully", status: 200 , data : findUser });
  });
};

module.exports = Controller;
