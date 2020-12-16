const User = require("../models/user");
const passport = require("passport");
const getUserParams = body => {
    return {
        username: body.username,
        email: body.email,
        password: body.password
    };
};


module.exports = {
    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if(redirectPath){
            res.redirect(redirectPath); 
        }
        else {
            next();
        }
   },

    new: (req, res) => {
        res.render("register");
    },

    create: (req, res, next) => {
        if(req.skip){
            next();
        }  
        let newUser = new User(getUserParams(req.body));
        console.log(newUser)
        User.register(newUser, req.body.password, (error, user) => {
            if(user){
                console.log(`Account ${user.username} created!`);
                res.locals.redirect = "/";
                next();
            } 
            else {
                console.log(`Could not create account: ${error.message}.`);
                req.flash("error",`Could not create account: ${error.message}.`);
                res.locals.redirect = "/register";
                next();
            }
        });
    },

    login: (req, res) => {
        res.render("login");
    },

    authenticate: passport.authenticate("local", {
        successRedirect: "/",
        successFlash: "Successfully logged in!",
        failureRedirect: "/login",
        failureFlash: "Could not log in. Your username or password is incorrect."
    }),

    logout: (req, res, next) => {
        req.logout();
        res.locals.redirect = "/";
        next();
    }
}