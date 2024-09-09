const mongoose = require("mongoose");

const floorSchema  = mongoose.Schema({
    floorname:{
        type:String,
        required:[true,"Enter a valid name containing only letter's and spaces"],
        minLength:1,
        trim:true,
    }
},
{
    timestamps:true
});

module.exports = mongoose.model("eventFloor",floorSchema);