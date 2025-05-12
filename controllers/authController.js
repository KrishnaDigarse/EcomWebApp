const userModel = require("../models/user-model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { generateToken } = require("../utils/generateToken")

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

module.exports.loginUser = async function(req, res){
    let {email, password} = req.body

    let user = await userModel.findOne({email: email})
    if(!user) return res.send("Email or password incorrect")

    bcrypt.compare(password, user.password, function(err, result){
        if(result) {
            let token = generateToken(user)
            res.cookie("token", token)
            return res.redirect("/shop")
        } else {
            return res.send("Email or password incorrect")
        }

    })
}

module.exports.logout = async function(req, res){
    res.cookie("token", "")
    res.redirect("/")
}