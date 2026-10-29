const userModel = require("../model/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/sendEmail")

async function registerUser(req, res) {
    try {
        const { username, email, password, role } = req.body

        const isUserAlreadyExist = await userModel.findOne({ email })

        if (isUserAlreadyExist) {
            return res.status(409).json({ message: "User Already Exist!" })
        }

        const salt = 10 //generate salt
        const hash = await bcrypt.hash(password, salt);

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role
        })

        if (user) {
            // generate a otp
            // const otp = Math.floor(100000 + Math.random() * 900000);

            // send welcome mail and otp on mail
            // we will send only welcome mail for now
                const message = `
            <h2>Welcome to ShopNest, ${username}! </h2>
            <p>Thank you for registering on our platform.</p>
            `
            // <p>Your one-time verification/discount OTP is: <strong>${otp}</strong></p>

            await sendEmail({
                email: user.email,
                subject: `Welcome to ShopNest: A trusted E-commerce platform`,
                message
            })

            // token generation for authentication
            const token = jwt.sign({
                id: user._id,
                role: user.role
            }, process.env.JWT_SECRET, { expiresIn: '7d' })

            res.cookie("token", token)

            res.status(201).json({
                message: "User Registered Successfully!!",
                user: {
                    _id: user._id,
                    name: user.username,
                    email: user.email,
                    role: user.role,
                    token: token
                }
            })
        } else {
            res.status(400).json({ message: "Invalid user data" })
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function loginUser(req, res) {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({
                id: user._id,
                role: user.role
            }, process.env.JWT_SECRET, { expiresIn: '7d' })

            res.cookie("token", token)

            res.status(201).json({
                message: "User Logged-IN Successfully!",
                user: {
                    _id: user._id,
                    name: user.username,
                    email: user.email,
                    role: user.role,
                    token: token
                }
            })
        }
        else {
            res.status(400).json({ message: "Invalid User or Password!!" })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

async function getUsers(req, res) {
    try {
        const users = await userModel.find({}).select('-password')
        res.status(200).json(users); 
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = { registerUser, loginUser, getUsers}