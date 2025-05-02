const express = require("express")
const app = express()
const PORT = 8000

app.get('/',(req,res)=>{
    return res.json({message: `Hello From Express Server ${process.pid}`})
})

// process.pid -> Jab bhi tu Node.js app run karta hai (chahe wo master ho ya worker), system usko ek unique number deta hai — usi ko process.pid kehte hain.
// Ye number OS assign karta hai, taki us process ko monitor, manage ya kill kiya ja sake.

app.listen(PORT,()=> console.log(`Server started at PORT:${PORT}`))