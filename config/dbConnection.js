const mongoose = require("mongoose");

// Connect to MongoDB

const DB_URI = process.env.MONGO_DB_URI;

const DB_CONNECTION = () => {
  mongoose
    .connect(DB_URI, {
      dbName: "Student_Att",
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Connection error:", err));
};

module.exports = DB_CONNECTION;