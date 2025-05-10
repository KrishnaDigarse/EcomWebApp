const express = require("express")
const router = express.Router()

router.get("/", (req, res) => {
    let error = 0
    res.render("index", { error })
})

module.exports = router