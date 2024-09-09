const mongoose = require("mongoose");

const bootSchema = mongoose.Schema({
    boothname:{
        type:String,
        required:[true,"boothname is required"],
        trim:true,
        minLength:3,
    },
    // bothhall:{
    //     required:[true,"boothname is required"],
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Hall'
    // },
    boothhall:{
        required:[true,"boothname is required"],
        type:String
    },
},
{
    timestamps:true
});

module.exports = mongoose.model("boothModel",bootSchema);