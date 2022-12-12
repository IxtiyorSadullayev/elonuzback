const jwt = require('jsonwebtoken');
const User=require('./../models/user.model');

const submitMiddleware = async (req,res,next) =>{
    try {
        const gettoken = req.headers.authorization;
        // console.log(gettoken)
        const bearer = gettoken.split(' ')[0];
        const token = gettoken.split(' ')[1];
        if(bearer !== 'Bearer'){
            return res.status(401).json({
                message: "Foydalanuvchi identifikatsiyadan o'tmagan",
                error: 'User not authorization'
            })
        }
        
        // 931653701
        // 13000
        const verify =  jwt.verify(token, process.env.SECRET);
        req.user = verify.user;
        next();

    } catch (e) {
        res.status(500).json({
            message: 'Kutilmagan hatolik',
            error: e.message
        })
    }
}

module.exports = submitMiddleware;