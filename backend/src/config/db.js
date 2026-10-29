const mongoose = require("mongoose")

async function connectTOdb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Server is connected to MONGO-DB")
    }
    catch(err){
        console.log("Database connection error:", err)
        process.exit(1) // process exits with an error 
    }
}

module.exports = connectTOdb