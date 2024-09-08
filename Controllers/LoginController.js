const UserAccount = require("../Models/userAccount");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Controller = async (req, res) => {
  const { email, password } = req.body;

  const userAccount = await UserAccount.findOne({ email });

  if (userAccount) {
    if (userAccount.password === password) {
      userAccount.isLogin = true;
      await userAccount.save();
      const token = jwt.sign(userAccount._id.toString(), process.env.JWT_SCRET);

      return res.json({ status : 200 , message: "Login successful" , token });
    } else {
      return res.json({status : 401 , error: "Incorrect password!!" });
    }
  } else {
    return res.json({ status : 404 , error: "Invalid Email Address!!" });
  }
};

module.exports = Controller;
