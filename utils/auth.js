const jwt = require("jsonwebtoken")
const  secret_key = "tomokon-mern-market"

const auth = async(req, res, next) => {
    if(req.method === "GET"){
        return next()
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIyQGdtYWlsLmNvbSIsImlhdCI6MTY3NzE2OTY1OSwiZXhwIjoxNjc3MjUyNDU5fQ.w5B9WUJxWSA8jMMueW5rvbyjUASJPKqDLuoNzq59A7o"
    //await req.headers.authorization.split("")[1]
    if (!token){
        return res.status(400).json({message: "You need to login again."})
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