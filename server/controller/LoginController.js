const userModel = require("../models/userAccountModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginController = async(req,res) =>{
try {
    const {useremail,userpassword} = req.body;

    if(!useremail && !userpassword)
    {
        res.status(400).json({err:"Invalid Input's"})
    }

     // Check if user exists
    const checkUserExistance =await userModel.findOne({useremail});
    
    // if email dosen'd exist throw error
    if(!checkUserExistance) res.status(401).json({err:"Credentials wrong"});

    // password comparison
    const comparePassword = await bcrypt.compare(userpassword,checkUserExistance.userpassword);

    // if password is wrong return error
    if(!comparePassword) res.status(401).json({err:"Credentials wrong"});

    // if password is valid generate a token
    const token = await jwt.sign( 
        {userid:checkUserExistance._id,useremail:checkUserExistance.useremail,userrole:checkUserExistance.userrole},
        process.env.Jwt_secret_key,
        {
            expiresIn:"30d"
        } );
        
        
        res.status(200).json({msg:"login successfull",token:token});

} catch (error) {
        console.log(error);
        // General error response
        return res.status(500).json({ error: "Internal server error" });

}
}


module.exports = {loginController};