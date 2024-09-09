const mongoose = require("mongoose");

const hallSchema = mongoose.Schema({
    hallname:{
        type:String,
        required:true,
    } ,
    // floorname
    floor:{
        required:true,
        type:String    
    } ,
    // floor:{
    //     required:true,
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'eventFloor'
    // } ,
    hallstatus:{
        type:String,
        required:true,
        enum: ['available', 'occupied', 'maintenance'],
        default: 'available'
    } 
},
{
    timestamps:true,
}
);

module.exports = mongoose.model("hallModel",hallSchema);