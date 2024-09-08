const Report = require("../Models/reports");
const useraccount = require("../Models/userAccount");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Controller = async (req, res) => {
  const { token , date , reason , leaveType } = req.body;

  jwt.verify(token, process.env.JWT_SCRET, async (err, userID) => {
    if (err) {
      return res.status(403).json({ message: "Token is not valid" });
    }

    const user = await useraccount.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    if (!reason) {
      return res.status(400).json({ message: "Report message is required" });
    }

    const checkReport = await Report.findOne({ userID, date: date });

    if (checkReport) {
      return res.json({status : 409 , message: "You have already submitted a report for " + date });
    } else {
      const report = new Report({
          name : user.name,
          rollNo : user.rollNo,
          userID : user._id,
          date : date,
          reason : reason,
          leaveType : leaveType,
          classname : user.classes,
          status : 'Pending'
      });

      await report.save();

      const allReports = await Report.find({userID});

      res.json({ message: "Report submitted successfully" , data : allReports});
    }
  });
};

module.exports = Controller;
