const express = require("express");
const app = express();
const router = express.Router();
const indexController = require("./controllers/indexController.js");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.urlencoded({
    extended: false
}));

router.get("/", indexController.index);

app.use("/", router);

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

