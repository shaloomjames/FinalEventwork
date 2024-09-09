const eventModel = require("../models/eventModel");

// @Request   Get
// @Route     /api/event/
// @access    private
const getEvents = async(req,res)=>{
    try {
        const Events = await eventModel.find();

        if(!Events) return res.status(404).json({err:"No events Found"});

        return res.status(201).json(Events);
    } catch (error) {
        console.log(`Error Reading Event's ${error}`);
        return res.status(500).json({err:"Internal Server Error"});
    }
}


// @Request   Post
// @Route     /api/event/
// @access    private
const createEvent = async(req,res)=>{
    try {
        const {eventname,eventDes,event_theme,event_date,event_booth,eventHall} = req.body;

        // Regular expressions for validation
        const CommonRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the name contains only letters , numbers and spaces and disallow special characters.
        const DateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/; // Ensures that the date is ina valid pattern YYYY-MM-DD.

        // validation chack
        if(!CommonRegex.test(eventname)) return res.status(400).json({err:"Invalid Event Name.only letter's , number's and spaces are allowed."})
        if(!CommonRegex.test(eventDes)) return res.status(400).json({err:"Invalid Event Desc.only letter's , number's and spaces are allowed."})
        if(!CommonRegex.test(event_theme)) return res.status(400).json({err:"Invalid Event theme.only letter's , number's and spaces are allowed."})
            if(!DateRegex.test(event_date)) return res.status(400).json({err:"Invalid Date pattern .first year than month and than day should be written."})
        if(!CommonRegex.test(event_booth)) return res.status(400).json({err:"Invalid Event booth.only letter's , number's and spaces are allowed."})
        if(!CommonRegex.test(eventHall)) return res.status(400).json({err:"Invalid Event hall.only letter's , number's and spaces are allowed."})

            const EventExist = await eventModel.findOne({eventname});

            if(EventExist) return res.status(400).json({err:""})
    } catch (error) {
        console.log(`Error Creating Event ${error}`);
        return res.status(500).json({err:"Internal Server Error"});
    }

    
}

// @Request   delete
// @Route     /api/event/
// @access    private
const deleteEvent = async(req,res)=>{
    try {
        const _id = req.params.id;

        const deletedEvent = await eventModel.findByIdAndDelete({_id});

         if(!deletedEvent) return res.status(404).json({err:"Event not Found"});

         return res.status(201).json({msg:"Event Deleted Successfully"},deletedEvent);
    } catch (error) {
        console.log(`Error Deleting Event ${error}`)
        return res.status(500).json({err:"Internal Server Error"});
    }
}



module.exports = {getEvents,deleteEvent,createEvent}