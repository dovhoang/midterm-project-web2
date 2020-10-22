const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const boardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: ObjectId,
            ref: "User"
        }

    },
    { timestamps: true }
)

module.exports = mongoose.model('Board', boardSchema);