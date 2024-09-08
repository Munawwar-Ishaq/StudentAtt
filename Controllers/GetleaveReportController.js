const Reports = require('../Models/reports');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Controller = (req , res) => {

    const { token } = req.body;

    console.log('REport Get Api');
    

    jwt.verify(token, process.env.JWT_SCRET, async (err, id) => {
        if (err) {
            return res.json({status : 403 ,  error: 'Invalid token' });
        }
        
        let AllReports = await Reports.find({ userID: id });

        res.json({status : 200, data : AllReports});
    });
}

module.exports = Controller;