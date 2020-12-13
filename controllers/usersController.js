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
                console.log(`Account ${user.name} created!`);
                res.locals.redirect = "/";
                next();
            } 
            else {
                console.log(`Could not create account: ${error.message}.`);
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
        failureRedirect: "/login"
    }),
    logout: (req, res, next) => {
        req.logout();
        res.locals.redirect = "/";
        next();
    }
}