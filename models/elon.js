const mongoose = require('mongoose');

const elonSchema = new mongoose.Schema({
    title: { type: String, minlength: 10, maxlength: 255 },
    body: { type: String, minlength: 10, maxlength: 25500 },
    show_count: { type: Number, default: 0 },
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    deslike: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
}, {
    timestamps: true
});

module.exports = mongoose.model('elon', elonSchema);