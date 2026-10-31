const express = require("express")
const cookieParser = require("cookie-parser")
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")
const orderRoutes = require("./routes/order.routes")

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/order", orderRoutes)

module.exports = app