const cron = require("node-cron");
const Attendance = require("../Models/attendence");
const StudentsAccount = require("../Models/userAccount");


const AutoAttendance = () => {
  console.log("Auto Attendence");

  cron.schedule("00 14 * * *", async () => {
    console.log("Run Timinng Function");

    const students = await StudentsAccount.find({ attendenceMarked: false });

    for (const student of students) {
      const attendance = new Attendance({
        userID: student._id,
        username: student.name,
        profileImage: student.profilePicture,
        mark: false,
        date: new Date(),
        class: student.classes,
      });
      await attendance.save();
      await StudentsAccount.findByIdAndUpdate(student._id, {
        attendenceMarked: true,
      });
    }
  });
};

const AllowMarkInNextDay = () => {
  cron.schedule("17 22 * * *", async () => {
    console.log("Run Timinng Function");

    await StudentsAccount.updateMany({}, { $set: { attendenceMarked: false } });
  });
} 

module.exports = {
  AutoAttendance,
  AllowMarkInNextDay
};
