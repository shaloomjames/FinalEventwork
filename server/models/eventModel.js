const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    eventname:{
        type:String,
        required:[true,"event name is required"]
    },
    eventDes:{
        type:String,
        required:[true,"event description is required"]
    },
    event_theme:{
        type:String,
        required:[true,"event theme is required"]
    },
    event_date:{
        type: Date,
        required: true
    },
    event_booth: [{
        type:String,
        required: true
    }],
    // event_booth: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Booth'
    // }],
    eventHall:{
        type: String,
        required: true
    }
    // eventHall:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Hall'
    // }
},
{
    timestamps:true
}
);


module.exports = mongoose.model("eventModel",eventSchema);