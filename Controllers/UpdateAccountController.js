const UserAccount = require('../Models/userAccount');
const jwt = require('jsonwebtoken');

const Controller = async (req , res) => {
    const { name , classes , rollNo , profilePicture , token , email } = req.body;
    console.log('REquest Updating Data' , req.body);
    
    if(!token){
        return res.json({ error: 'Token is required' });
    }

    jwt.verify(token, process.env.JWT_SCRET , async (err , UserID) => {
        if(err){
            return res.json({ error: 'Invalid token' });
        }

        const user = await UserAccount.findById(UserID);

        if(!user){
            return res.json({ message: 'User not found' , status : 404 });
        }

        if(name){
            user.name = name;
        }

        if(classes){
            user.classes = classes;
        }

        if(rollNo){
            user.rollNo = rollNo;
        }

        if(profilePicture){
            user.profilePicture = profilePicture;
        }

        if(email){
            user.email = email;
        }

        await user.save();

        res.json({ message: 'User updated successfully' , data : user });

    });

}

module.exports = Controller;