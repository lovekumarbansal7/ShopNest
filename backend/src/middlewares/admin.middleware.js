const admin = (req, res, next) =>{
    if(!req.user){
        return res.status(401).json({
            message: 'Authorization required'
        })
    }

    if(req.user.role === 'admin'){
        return next()
    }
    else{
        return res.status(403).json({
            message: 'Access Denied, Admin only!'
        })
    }
}

module.exports = {admin}

