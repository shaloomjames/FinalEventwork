const userAccountModel = require("../models/userAccountModel");
// const UserAccountModel = require("../models/userAccountModel");
const bcrypt = require("bcrypt");

// @Request   GET
// @Route     http://localhost:5000/api/useraccount
// @Desc      Get all user accounts
const getUserAccount = async(req,res)=>{
try {
    const userAccounts = await userAccountModel.find();

    if(userAccounts.length === 0) return res.status(404).json({err:"No user Account's found"});

    res.status(200).json(userAccounts);
} catch (error) {
    console.log("Error fetching user accounts:", error);
    res.status(500).json({err:"Internal Server Error"});
}
}

// @Request   GET
// @Route     http://localhost:5000/api/useraccount/id
// @Desc      Get a single user accounts
const getSingleUserAccount = async(req,res)=>{
try {
    const _id = req.params.id;

    const userAccount = await userAccountModel.findOne({_id});

    if(!userAccount) return res.status(404).json({err:"User Account Not Found"});

    res.status(200).json(userAccount)
} catch (error) {
    console.log(`Error finding user Account ${error}`)
    res.status(500).json({err:"Internal Server Error"});
}
}

// @Request   post
// @Route     http://localhost:5000/api/useraccount/
// @Desc      Create a new user account
const createUserAccount = async(req,res)=>{
    try {
        // Destructure the request body
        const { username, useremail, userpassword, userrole } = req.body;
        
     // console.log("req.file contains", req.file);
    // console.log("req.file contains buffer", req.file.buffer);

    // Regular expressions for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Ensures that the email address is in a valid format.
    const nameRegex = /^[A-Za-z\s]+$/; // Ensures that the name contains only letters and spaces, disallowing numbers and special characters.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Ensures password is at least 8 characters long, includes uppercase, lowercase, number, and special character.

    // Validation checks
    if(!nameRegex.test(username))
    {
       return res.status(400).json({err:"Invalid username. only letter's and spaces are allowed."});
    }
    if(!emailRegex.test(useremail))
    {
       return res.status(400).json({err:"Invalid email address."})
    }
    if(!passwordRegex.test(userpassword))
    {
        return res.status(400).json({err:"Password must be atleast 8 character's long, include an uppercase letter, a lowercase letter, a number, and a special character."});
    }

    // Check if the user already exists
    const checkUserExistance = await UserAccountModel.findOne({useremail}); 
    if(checkUserExistance) return res.status(400).json({err:"Email already exist's"});

    // Hashing the password using bcrypt
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(userpassword,saltRound);

          // Creating the user using disk storage
          const createUser = await UserAccountModel.create({
            username,
            useremail,
            userpassword:hash_password,
            userrole,
            // userimage:req.file.filename,
          });

          res.status(201).json({msg:"User Registered successfully",createUser});
    } catch (err) {
        console.log(`Error creating user account ${err}`);
        res.status(500).json({err:"User Registration failed",error:err.message});
    }
}

// @Request   delete
// @Route     http://localhost:5000/api/useraccount/id
// @Desc      delete a user account
const deleteUserAccount = async(req,res)=>{
    try {
        //  Get the ID from the request parameters
        const id = req.params.id;

        // Find the user by ID and delete it
        const deletedUserAcount = await userAccountModel.findByIdAndDelete({_id:id});

        // Check if the user account was found and deleted
        if(!deleteUserAccount) return res.status(404).json({err:"user account not found"});


     return res.status(200).json({msg:"user account deleted successfully",deletedUserAcount});
    } catch (error) {
        console.log(`Error deleting user account ${error}`);
        return res.status(500).json({err:"Internal server error"});
    }
}

const updateUserAccount = async(req,res) =>{
    try {
        const {username,useremail} = req.body;

        const u_id = req.params.id;

        // Regular expressions for validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[A-Za-z\s]+$/;

        if(!nameRegex.test(username)) return res.status(400).json({err:"Invalid username. Only letter's and spaces are allowed."});

        if(!emailRegex.test(useremail)) return res.status(400).json({err:"Invalid email address."});

        // Find the existing user
        const existingUser = await userAccountModel.findById(u_id);
        if(!existingUser) return res.status(404).json({err:"User Account not found"});

        // Prepare update data
        const updateData = {
            username,
            useremail,
            userimage: req.file ? req.file.filename : existingUser.userimage, 
            role: existingUser.role, 
            password: existingUser.password,
        };
  
        // // Conditionally update image
        // updateData.userimage = req.file ? req.file.filename : existingUser.userimage;
        
        // Update the User
        const updatedUser = await userAccountModel.findByIdAndUpdate(u_id,updateData,{new:true})

      return  res.status(201).json({msg:"user updated Successfully",updatedUser});

    } catch (error) {
    console.error("Error updating user account:", error);
  return res.status(500).json({ err: "User update failed", error: error.message });
    }
}

module.exports = {createUserAccount,deleteUserAccount,getUserAccount,getSingleUserAccount,updateUserAccount}