const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: "Authorization is required!!" })
        }
        // decoded contains payload information (id and role only)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id).select('-password')

        // if token is valid but user is deleted from mogodb then usermodel will return null 
        if(!user){
            return res.status(401).json({message: "User not found or no longer authorized!"})
        }

        req.user = user
        // constinue to the next middleware or route
        return next()
    }
    catch(err){
        res.status(401).json({message: err.message})
    }
}

module.exports = {protect}