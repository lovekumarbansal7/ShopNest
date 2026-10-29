const express = require("express")
const {registerUser, loginUser, getUsers} = require("../controllers/auth.controller")
const {protect} = require("../middlewares/auth.middleware")
const {admin} = require("../middlewares/admin.middleware")

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/getusers", protect, admin, getUsers)

module.exports = router
