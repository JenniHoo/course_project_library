const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const passport = require("passport");
const booksController = require("./controllers/booksController.js");
const indexController = require("./controllers/indexController.js");
const usersController = require("./controllers/usersController.js");
const User = require("./models/user");


mongoose.Promise = global.Promise;

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: false
}));

app.use(express.static(__dirname + '/public'));

// Passport route
router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// Index route
router.get("/", indexController.index);

//Register route
router.get("/register", usersController.new);
router.post("/register/new", usersController.create, usersController.redirectView);


// User routes
router.get("/login", usersController.login);

// Book routes
router.get("/booklist", booksController.index, booksController.indexView);
router.get("/books/:id", booksController.show, booksController.showView);
router.post("/books/create", booksController.create, booksController.redirectView);
router.delete("/books/delete", booksController.delete, booksController.redirectView);

app.use(layouts);
app.use("/", router);

mongoose.connect("mongodb://localhost:27017/library_db", {
    useNewUrlParser: true
});

const db = mongoose.connection;

db.once("open", () => {
    console.log("Connected to database!");
});

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

