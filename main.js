const express = require("express");
const app = express();
const router = express.Router();
const mongoose = require("mongoose");
const layouts = require("express-ejs-layouts");
const booksController = require("./controllers/booksController.js");
const indexController = require("./controllers/indexController.js");


mongoose.Promise = global.Promise;

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: false
}));

router.get("/", indexController.index);
router.post("/books/create", booksController.create, booksController.redirectView);

app.use(layouts);
app.use("/", router);
app.use(express.static(__dirname + '/public'));

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

