const Elon = require('./../models/elon');

exports.getAll = async(req,res,next) =>{
    try {
        const elons = await Elon.find();
        res.status(200).json({
            message: 'Elonlar royxati',
            elonlar: elons
        })
    } catch (e) {
        res.status(500).json({
            message: 'Baza bilan bogliq muammo bor',
            error: e.message
        })
    }
}

exports.getMy = async(req,res,next) =>{
    try {
        const user = req.user;
        const myelons = await Elon.find({user: user._id})
        res.status(200).json({
            message: 'Elonlar royxati',
            elonlar: myelons
        })

    } catch (e) {
        res.status(500).json({
            message: 'Baza bilan bogliq muammo bor',
            error: e.message
        })
    }
}

exports.getAdd = async(req,res,next) =>{
    try {
        const {title, body} = req.body;
        const user = req.user;
        const newelon = await Elon.create({title, body, user: user._id})
        res.status(201).json({
            message: 'Elon bazaga qoshildi',
            elon: newelon
        })
    } catch (e) {
        res.status(500).json({
            message: 'Baza bilan bogliq muammo bor',
            error: e.message
        })
    }
}

exports.getUpdate = async(req,res,next) =>{
    try {
        const id = req.params.id;
        const upelon = await Elon.findByIdAndUpdate(id, req.body)
        res.status(200).json({
            message: 'Elon yangilandi',
            elon: upelon
        })
    } catch (e) {
        res.status(500).json({
            message: 'Baza bilan bogliq muammo bor',
            error: e.message
        })
    }
}