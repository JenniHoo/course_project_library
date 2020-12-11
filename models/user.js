const mongoose = require("mongoose");
const {Schema} = mongoose;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String, 
        required: true,
        lowercase:true,
        unique: true 
    }
})

userSchema.plugin(passportLocalMongoose, {
    usernameField: "name"
});

module.exports = mongoose.model("User", userSchema);
