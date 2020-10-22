const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const boardColumnSchema = new mongoose.Schema({
    boardId: {
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
        require: true
    }
})

module.exports = mongoose.model('BoardColumn', boardColumnSchema);