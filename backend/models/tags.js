const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const tagSchema = new mongoose.Schema({
    board: {
        type: ObjectId,
        ref: 'Board'
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    type: {
        type: Number,
        required: true
    }
},
    { timestamps: true })

module.exports = mongoose.model('Tag', tagSchema);