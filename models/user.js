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

userSchema.path("username").validate(function(username) {
    return username.length <= 15;
}, "Usernames cannot be more than 15 characters long");

userSchema.plugin(passportLocalMongoose, {
    usernameField: "username"
});

module.exports = mongoose.model("User", userSchema);
