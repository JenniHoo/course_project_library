const User = require("../models/user");

module.exports = {
    index: (req, res, next) => {
        User.find({})
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Couldn't get users: ${error.message}`)
                next(error);
            })
   },
   indexView: (req, res) => {
        res.render("users/index");
   },
    login: (req, res) => {
        res.render("login");
    }
}