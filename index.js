const express = require("express");
const app = express();
const cors = require("cors")

app.use(cors())
app.use(express.urlencoded({
    extented : true
}))
app.use(express.json())

const jwt = require("jsonwebtoken")
const auth = require("./utils/auth")
const connectDB = require("./utils/database");
const {ItemModel, UserModel} = require("./utils/schemaModels");


// ITEM functions
// Create Item
app.post("/item/create", auth, async(req, res)=> {
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
        const allItems = await ItemModel.find()
        return res.status(200).json({
            message: "success read ALL items!",
            allItems: allItems
        })
    }
    catch (err) {
        return res.status(400).json({message: "Faild to read ALL items..."})
    }
})

// Read Single Item
app.get("/item/:id", async(req, res)=> {
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(req.params.id)
        return res.status(200).json({
            message: "success read SINGLE items!",
            singleItem: singleItem
        })
    }
    catch (err) {
        return res.status(400).json({message: "Faild to read SINGLE items..."})
    }
})




// Update Item
app.put("/item/update/:id", auth, async(req, res)=> {
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(req.params.id)
        if(singleItem.email === req.body.email){
            await ItemModel.updateOne({_id:req.params.id}, req.body)
            return res.status(200).json({
                message: "success UPDATE items!",
            })}
            else {
                throw new Error()
            }
        }
    catch (err) {
        return res.status(400).json({message: "Faild UPDATE items..."})
    }
})



//Delete Item
app.delete("/item/delete/:id", auth, async(req, res) => {
    try {
        await connectDB()
        const singleItem = await ItemModel.findById(req.params.id)
        if(singleItem.email === req.body.email){
        await ItemModel.deleteOne({_id:req.params.id})
        return res.status(200).json({
            message: "Delete item!"
        })}
        else {
            throw new Error()
        }
    }
    catch (err){
        return res.status(200).json({message:"Couldn't delete..."})
    }
})



// USER functions
// Register User

app.post("/user/register", async(req, res)=> {
    try {
        await connectDB()
        await UserModel.create(req.body)
        return res.status(200).json({message: "Create new User Success!"})
    }
    catch(err) {
        return res.status(400).json({message: "Create new User failed!"})   
    }
})

// Login User
const secret_key = "tomokon-mern-market"
app.post("/user/login", async(req, res) => {
    try {
        await connectDB()
        const savedUseData = await UserModel.findOne({email: req.body.email})
        if (savedUseData) {
            //user exist
            if (req.body.password === savedUseData.password) {
                const payload = {email: req.body.email}
                const token = jwt.sign(payload, secret_key, { expiresIn: "23h" })
                console.log(token)
                return res.status(200).json({message: "Login success!", token: token})
            } else {
                return res.status(400).json({message: "Please put correct password."})
            }
        }
        else {
            //use is not exist
            res.status(400).json({ message: "You have to register."})
        }
    }
    catch (err) {
        return res.status(400).json({message: "Login failed!"})
    }
})

// Connecting to port
const port = process.env.PORT || 5000


app.listen(port, ()=> {
    console.log(`Listening on localhost port ${port}`);
});