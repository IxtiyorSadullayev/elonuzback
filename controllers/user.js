const User = require('./../models/user.model');
const jwt = require('jsonwebtoken');


exports.login = async (req,res,next) =>{
    try {
        const {phone, password} = req.body;
        const condidate = await User.findOne({phone});
        if(!condidate){
            return res.status(404).json({
                message: 'Foydalanuvchi topilmadi',
                error: 'Foydalanuvchi malumotlari notogri'
            })
        }

        if(condidate.password !== password){
            return res.status(404).json({
                message: 'Foydalanuvchi topilmadi',
                error: 'Foydalanuvchi malumotlari notogri'
            })
        }

        const token = jwt.sign({user:condidate}, process.env.SECRET, {expiresIn: '48h'})

        res.status(201).json({
            message: 'Foydalanuvchi aniqlandi va ish jarayoni siz uchun tayyor',
            token,
            user: condidate
        })

    } catch (e) {
        res.status(500).json({
            message: e.message,
            error: 'Bazadagi hatolik'
        })
    }
}

exports.register = async (req,res,next) =>{
    try {
        const {name, surname, phone, adress, password} = req.body;
        const condidate = await User.findOne({phone});

        if(condidate){
            return res.status(400).json({
                message: 'Bu foydalanuvchi bizda mavjud',
                error: 'Ikkilangan foydalanuvchi'
            })
        }
        console.log(condidate)
        const newuser = new User({name, surname, adress, phone, password});
        console.log(newuser)
        await newuser.save();

        console.log(newuser)

        const token = jwt.sign({user:newuser}, process.env.SECRET, {expiresIn: '48h'})

        res.status(201).json({
            message: 'Foydalanuvchi yaratildi',
            token,
            user: newuser
        })

    } catch (e) {
        console.log(e.message)
        res.status(500).json({
            message: e.message,
            error: 'Bazadagi hatolik'
        })
    }
}

exports.tekshir = async (req,res,next) =>{
    try {
        
        const users = await User.find();
        return res.status(200).json(users)

    } catch (e) {
        res.status(500).json({
            message: e.message,
            error: 'Bazadagi hatolik'
        })
    }
}