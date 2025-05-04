const express = require("express")
const router = express.Router()
const ownerModel = require("../models/owners-model")
const ownersModel = require("../models/owners-model")

router.get("/", function(req, res){
    res.send("This is Owners Route.")
})

if(process.env.NODE_ENV === "development"){
    router.post("/create", async (req, res) => {
        let owner = await ownerModel.find()
        if(owner.length > 0){
            return res
                .status(502)
                .send("You do not have permission to be an owner.")
        }

        let {fullname, email, password} = req.body

        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner)
    })
}

module.exports = router