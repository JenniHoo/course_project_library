const mongoose = require("mongoose");
const {Schema} = mongoose;

const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    shelfLocation: {
        type: String,
        required: true,
        unique: true
    },
    numberAvailable: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Book", bookSchema);
