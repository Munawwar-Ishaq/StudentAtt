const UsersData = require('../Models/userAccount'); 
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Controller = (req , res) => {
    const { token } = req.params;
    jwt.verify(token ,  process.env.JWT_SCRET , async (err, id) => {
        if(err) return res.json({error : 'Invalid Token' , status : 401});
        const user = await UsersData.findById(id).select('-password');
        if(!user) return res.json({error : 'User not found' , status : 404});

        res.json({
            data : user,
            status : 200
        });
    })

}

module.exports = Controller;