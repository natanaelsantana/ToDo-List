const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//This refers to todo list itself
const items = ["Eat food", "Wash the dishes"];
const workItems = []
//----------*-----------------

//This refers to take pieces from "ejs" file, also run server side
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
//----------*-----------------


//This refers to take the day, month and years and post like a title
//Also it turn possible to add new items on the list
app.get("/", function (req, res) {

    let today = new Date()
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("pt-BR", options);

    res.render("list", {
        ListTitle: day,
        newListItems: items
    })

});

app.post("/", function (req, res) {
    let item = req.body.newItem

/*This applies a simple logic,if the item is from worklist*/
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work")
      }  else {
            items.push(item)
            res.redirect("/")
        }
    
})
//----------*-----------------

//this refers to another list 
app.get("/work", function (req, res) {
    res.render("list", { ListTitle: "Work List", newListItems: workItems })
})

//This run the entire project in server side
app.listen(3000, function () {
    console.log("Servers started on port 3000");
});