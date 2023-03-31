const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")
const _ = require('lodash')

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

mongoose.connect("mongodb+srv:///todolistDB")


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

const defaultItems= [item1, item2, item3];

const ListSchema = {
    name:String,
    items: [itemsSchema]
};

const List = mongoose.model("List", ListSchema);

/*async function err () {
    await Item.insertMany(defaultItems)
}*/ 

app.get("/", function (req, res) {

Item.find( {} )
    .then (function (foundItems) {
    if (foundItems.length === 0) {
            return Item.insertMany(defaultItems)
    } else {
        res.render("list", {
            ListTitle: "Today",
            newListItems: foundItems,
            });
        } 
    })
});

app.post("/", function (req, res) {
    const itemName = req.body.newItem;
    const listName = req.body.list

    const item = new Item ({
        name: itemName
    })

    if(listName === "Today"){
        item.save();
        res.redirect("/");
    } else {
        List.findOne({ name: listName})
            .then (function(foundList){
                foundList.items.push(item);
                foundList.save();
                res.redirect("/" + listName)
            })
    }
    
  
});
//----------*-----------------

app.post("/delete", function(req,res) {
  const checkedItemId = req.body.checkbox
  const listName = req.body.listName

    if (listName === "Today") {
        Item.find ( {})
    .then (function () {
        res.redirect("/");
        return Item.deleteOne({_id: checkedItemId})
    })
    } else {
        List.findOneAndUpdate (
            {name : listName},
            {$pull: {items: {_id : checkedItemId}}})
        .then(function (foundList) {
                res.redirect("/" + listName)
            })

        
    }
})


//this refers to another list 
app.get("/:customListName", function (req, res){
    const customListName = _.capitalize(req.params.customListName)
    
  
    List.findOne ( {name: customListName} )
        .then (function (foundList) {
            if (!foundList) {
                const list = new List ({
                    name: customListName,
                    items: defaultItems
                });
                list.save()
                res.redirect("/" + customListName)
            } else {
                res.render("list", {
                    ListTitle: foundList.name,
                    newListItems: foundList.items,
                    });
            }
        })

})
    

app.get("/about", function (req, res) {
    res.render("about")
})


//This run the entire project in server side
app.listen(3000, function () {
    console.log("Servers started on port 3000");
});
