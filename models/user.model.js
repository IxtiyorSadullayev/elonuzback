const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 20 },
    surname: { type: String, required: true, minlength: 3, maxlength: 20 },
    phone: { type: String, required: true, minlength: 7, maxlength: 20, unique: true },
    adress: { type: String, required: true, minlength: 3, maxlength: 20 },
    password: { type: String, required: true, minlength: 3, maxlength: 20 },
    data: { type: Date, default: null },
    status: { type: String, enum: ['CLASS', 'ODDIY', 'NAMUNALI'], default: 'ODDIY' }
}, {
    timestamps: true
})

module.exports = mongoose.model('user', userModel);