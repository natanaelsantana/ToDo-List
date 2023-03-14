const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

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

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB")


const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema)

const item1 = new Item ({
    name: "Welcome to your todolist!"
});
const item2 = new Item ({
    name: "Hit the + to add more"
});
const item3 = new Item ({
    name: "Hit the checkboxes to delete"
});

const defaultItems= [item1, item2, item3]

async function err () {
    await Item.insertMany(defaultItems)
}


app.get("/", function (req, res) {


    res.render("list", {
        ListTitle: "day",
        newListItems: defaultItems
    })

});

app.post("/", function (req, res) {
    let item = req.body.newItem

/*This applies a simple logic,if the item is from worklist, the item will be 
there and not in the home list*/
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


app.get("/about", function (req, res) {
    res.render("about")
})


//This run the entire project in server side
app.listen(3000, function () {
    console.log("Servers started on port 3000");
});