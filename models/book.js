const mongoose = require("mongoose");
const bookSchema = mongoose.Schema({
    name: String,
    author: String,
    shelfLocation:  String,
    numberAvailable: Number
})

module.exports = mongoose.model("Book", bookSchema);
