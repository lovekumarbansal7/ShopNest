const dotenv = require("dotenv")
dotenv.config()
const app = require("./src/app")
const connectTOdb = require("./src/config/db")


app.get("/", (req, res)=>{
    res.send("ShopNest is woking properly!!")
})

connectTOdb()

const port = process.env.PORT || 5000 
app.listen(port, ()=>{
    console.log(`App is running on port ${port}`)
})