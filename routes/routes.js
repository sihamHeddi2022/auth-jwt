const { User } = require("../models/schema")
const bycrypt = require("bcryptjs")
const route= require("express").Router()
const jwt = require("jsonwebtoken")
const { authMiddlware } = require("../middleware/middleware")


route.post("/register",async(req,res)=>{
    try {
        const {username,password,full_name} = req.body
        if (!username || !password || !full_name) {
            res.json({message:"all fields must be filled"})
        }
        const user = await User.findOne({username:username})
        if (user) {
            res.json({message:"the user with that username is already exists"})
        }
        const salt = await bycrypt.genSalt(10)
        req.body.password =  await bycrypt.hash(password,salt)
        const u = await new User(req.body).save()
        const token = await jwt.sign({id:u.id},process.env.SECRET_KEY,{expiresIn:"4h"})
        return res.cookie("token",token).json({message:"you registered successfully"})
    } catch (error) {
        res.json({error:error})
    }
})


route.post("/login",async(req,res)=>{
    try {
        const {username,password} =req.body

        const user = await User.findOne({username:username})
        if(!user) res.json({message:"the user with that username does not exist"})
        const b = bycrypt.compare(password,user.password)
        if(b){
            const token = jwt.sign({id:user.id},process.env.SECRET_KEY,{expiresIn:"4h"})
           
            return res.cookie("token",token).json({message:"you logined successfully"})

        }
        return res.json({message:"error in credentials"})
    } catch (error) {
        res.json({error:error})
    }
 
})


route.get("/secret-page",authMiddlware,(req,res)=>{
    console.log(req.user);
     return res.json({message:"hi there !! I'm a secret page "})
})

module.exports = {route}