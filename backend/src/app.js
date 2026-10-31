const express = require("express")
// middlewares
const cookieParser = require("cookie-parser")
const cors = require('cors');
// routes
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/product.routes")
const orderRoutes = require("./routes/order.routes")
const paymentRoutes = require("./routes/payment.routes")
const analyticsRoute = require("./routes/analytics.route")

const app = express()

// middlewares
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/order", orderRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/analytics", analyticsRoute)

module.exports = app