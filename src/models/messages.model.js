const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, { timestamps: true, versionKey:false });

module.exports = mongoose.model("messages", schema); 