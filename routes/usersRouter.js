const express = require("express")
const router = express.Router()
const {registerUser} = require("../controllers/authController")

router.get("/", function(req, res){
    res.send("This is Users Route")
})


// Use joi for better form handling
router.post("/register", registerUser)

module.exports = router