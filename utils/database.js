const mongoose = require("mongoose");

const connectDB = async() => {
    
    try {
        await mongoose.connect("mongodb+srv://tomoko:kissa123@cluster0.cxu6hjm.mongodb.net/appDataBase?retryWrites=true&w=majority")
    } catch (err){
        throw new Error()
    }
}

module.exports = connectDB