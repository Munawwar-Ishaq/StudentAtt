const userAccount = require("../Models/userAccount");
const jwt = require('jsonwebtoken');
require('dotenv').config();


const Controller = async (req, res) => {
  const { id } = req.params;
    jwt.verify(id , process.env.JWT_SCRET , async (err , userID) => {
        if(err) return res.json({ error : err , message : 'Token Error' , status : 403});
        
        const user = await userAccount.findById(userID);
        
        if(!user) return res.json({ error : 'Account not found' , status : 404});
        
        user.isLogin = false;

        await user.save();

        res.json({ message : 'Logout Successfully' });
        
    })
};

module.exports = Controller;
