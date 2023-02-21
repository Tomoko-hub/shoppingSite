const express = require("express");
const app = express();

app.use(express.urlencoded({
    extented : true
}))
app.use(express.json())

const connectDB = require("./utils/database");
const {ItemModel} = require("./utils/schemaModels");

app.get("/", (req, res)=>{
    return res.status(200).json("Hello!");
});

// ITEM functions
// Create Item
app.post("/item/create", async(req, res)=> {
    try {
        await connectDB()
        await ItemModel.create(req.body)
        return res.status(200).json({message: "Create Item Success!"})
    }
    catch(err) {
        return res.status(400).json({message: "Create Item failed!"})   
    }
})

// Read all Items
app.get("/", async(req, res)=> {
    try {
        await connectDB()
        const allItems = await ItemModel()
        return res.status(200).json({message: " success read ALL items!", allItems: allItems})
    }
    catch (err) {
        return res.status(400).json({message: "Faild to read ALL items..."})
    }
})

// Read Single Item



// Update Item


//Delete Item



// USER functions


// Register User

// Login User



app.listen(5000, ()=> {
    console.log("Listening on localhost port 5000");
});