const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../middlewares/generateToken")

module.exports.registerUser = async function(req, res){
    try {
        let { email, fullname, password} = req.body;

        let user = await userModel.findOne({email: email})
        if(user) return res.status(401).send("You already have account")
    
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if(err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    let token = generateToken(user)
                    res.cookie("token", token)
                    res.send("User created successfully")
                }
            })
        })

  
    } catch(err){
        res.send(err.message)
    }
}