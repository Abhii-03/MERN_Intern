const express = require("express")
const router = express.Router()

const {login, signup} = require("../controllers/Auth");
const {auth, isAdmin} = require("../middleware/auth")

router.post("/login", login)
router.post("/signup", signup)

// testing route
// router.get("/test", auth, (req,res)=>{
//     res.send("Hello, you are authenticated")
// })
// protected route

// router.get("/admin", auth, isAdmin, (req,res) =>{
//     res.json({
//         success:true,
//         message: "Welcome Admin"
//     })
// })


module.exports = router