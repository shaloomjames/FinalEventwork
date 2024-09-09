const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{
        required:[true,"Enter a valid name"],
        type:String,
        minLength:3,
        trim:true
    },
    useremail:{
        required:[true,"Enter a valid email"],
        type:String,
        minLength:5,
        trim:true
    },
    userpassword:{
        required:[true,"Enter a valid passowrd"],
        type:String,
        minLength:3,
        trim:true
    },
    userrole:{
        required:[true,"Enter a valid name"],
        type:String,
        minLength:3,
        trim:true,
        default:"visitor",
    },
    // userimage:{
    //     // type:Buffer,
    //     type:String,
    //     required: [true, "Please add your image"]
    // },
},
{
    timestamps:true
});

module.exports = mongoose.model("userAccountModel",UserSchema);