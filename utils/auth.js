const jwt = require("jsonwebtoken")
const  secret_key = "tomokon-mern-market"

const auth = async(req, res, next) => {
    if(req.method === "GET"){
        //return next()
        return handler(req, res)
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsMUBnbWFpbC5jb20iLCJpYXQiOjE2Nzc2NTY5ODMsImV4cCI6MTY3NzczOTc4M30.ISkzZig6iXaGRjEw5HVbiJz5e9CmEv64wEjYpz7PNkY"
    //await req.headers.authorization.split("")[1]
    //const token = await req.headers.authorization.split("")[1]
    if (!token){
        //return res.status(400).json({message: "You need to login again."})
        return res.status(401).json({message: "You don't have token."})
    }
    try{
        const decoded = jwt.verify(token, secret_key)
        req.body.email = decoded.email
        return next()
    }
    catch(err){
        return res.status(400).json({message: "Token does not match. Please login."})
    }
}



module.exports = auth