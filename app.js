const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const items = ["Eat food", "Wash the dishes"];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    
    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("pt-BR", options);

    res.render("list", {
        kindOfDay: day,
        newListItems: items
    })

});

app.post("/", function (req, res) {
    const Item = req.body.newItem
    items.push(Item)
    res.redirect("/")
})

app.listen(3000, function () {
    console.log("Servers started on port 3000");
});