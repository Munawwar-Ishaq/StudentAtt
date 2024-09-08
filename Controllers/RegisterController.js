const UserAccount = require('../Models/userAccount');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Controller = async (req , res) => {
    
    const {name , email , password , classes , profilePicture , rollNo} = req.body;
    
    if(!name ||!email ||!password ||!classes ||!profilePicture || !rollNo) {
        return res.json({ error : 'All fields are required.' });
    }
    
    // If Email Already Exists
    const existingUser = await UserAccount.findOne({ email });
    
    if(existingUser) {
        return res.json({ error : 'Email already exists.' , status : 409 });
    }
      
    // Save User data In DataBase 
    const user = new UserAccount({
        name,
        email,
        password,
        classes,
        profilePicture,
        rollNo,
        isAdmin : false,
        isLogin : true,
        attendenceMarked : false
    })
    
    await user.save().then((ress) => {
        // Generate JWT Token
        const token = jwt.sign(ress._id.toString() , process.env.JWT_SCRET);
        console.log(token);
        let data = {
            id : user._id,
            name : user.name,
            email : user.email,
            classes : user.classes,
            profilePicture : user.profilePicture,
            rollNo : user.rollNo,
            isAdmin : user.isAdmin,
            isLogin : user.isLogin,
            attendenceMarked : user.attendenceMarked
        }        
        return res.status(200).json({ message : 'User created successfully.' , token , data });
    }).catch(err => {
        return res.status(500).json({ error : err.message });
    });

}

module.exports = Controller;