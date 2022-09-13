
const jwt = require("jsonwebtoken")
const { User } = require("../models/schema")


exports.authMiddlware = async (req,res,next)=>{
 
   try {
       const { token } = req.cookies
  
       if (!token) {
        res.json({message:"please login "})
      }
       const t = await jwt.verify(token,process.env.SECRET_KEY)
       req.user = await User.findById(t.id)
       next();
   } catch (error) {
    res.json(error)

   }


} 