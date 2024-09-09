const { get } = require("mongoose");
const hallModel = require("../models/hallModel");


// @Request   GET
// @Route     /api/hall/
// @access    private
const getHall = async(req,res)=>{
try {
    const Halls = await hallModel.find();

    if(Halls.length === 0) return res.status(404).json({err:"No halls Found"});

    res.status(200).json(Halls);
} catch (error) {
console.log(`Error Reading Halls ${error}`)
return res.status(500).json({err:"Internal Server Error"});    
}
}


// @Request   post
// @Route     /api/hall/
// @access    private
const createHall = async(req,res)=>{
try {
    const {hallname,floor,hallstatus} = req.body;

      // Regular expressions for validation
      const hallNameRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the name contains only letters , numbers and spaces and disallow special characters.
      const floorRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the name contains only letters , numbers and spaces and disallow special characters.
      const hallStatusRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the status contains only letters , numbers and spaces and disallow special characters.

      // Validation chack
      if(!hallNameRegex.test(hallname)) return res.status(400).json({err:"Invalid Name.only letter's , number's and spaces are allowed."});
      if(!floorRegex.test(floor)) return res.status(400).json({err:"Invalid floor Name.only letter's , number's and spaces are allowed"});
      if(!hallStatusRegex.test(hallstatus)) return res.status(400).json({err:"Invalid status Name.only letter's , number's and spaces are allowed."});

      const HallExistanceCheck = await hallModel.findOne({hallname});
      if(HallExistanceCheck)  return hallModel.findOne({err:"Hall already exist's"});

      const CreatedHall = await hallModel.create({hallname,floor,hallstatus});

      return res.status(200).json({msg:"Hall created Successfully",CreatedHall});
} catch (error) {
    console.log(`Error Creating Hall ${error}`);
    return res.status(500).json({err:"Internal Server Error"});
}
}


// @Request   put
// @Route     /api/hall/
// @access    private
const updateHall = async(req,res)=>{
try {
    const {hallname,floor,hallstatus} = req.body;

      // Regular expressions for validation
      const hallNameRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the name contains only letters , numbers and spaces and disallow special characters.
      const floorRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the name contains only letters , numbers and spaces and disallow special characters.
      const hallStatusRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the status contains only letters , numbers and spaces and disallow special characters.

      // Validation chack
      if(!hallNameRegex.test(hallname)) return res.status(400).json({err:"Invalid Name.only letter's , number's and spaces are allowed."});
      if(!floorRegex.test(floor)) return res.status(400).json({err:"Invalid floor Name.only letter's , number's and spaces are allowed"});
      if(!hallStatusRegex.test(hallstatus)) return res.status(400).json({err:"Invalid status Name.only letter's , number's and spaces are allowed."});

        const _id = req.params.id;

      const existingHall = await hallModel.findOne({_id});

      if(!existingHall) return res.status(404).json({err:"Hall not Found"});

      const UpdatedHall = {
        hallname,
        floor,
        hallstatus
      }

      const UpdateFloor = await hallModel.findByIdAndUpdate(_id,UpdatedHall,{new:true});

      return res.status(200).json({msg:"Hall Updated Successfully",UpdateFloor});
} catch (error) {
    console.log(`Error Deleting Hall ${error}`);
    return res.status(500).json({err:"Internal Server Error"});
}
}   

// @Request   delete
// @Route     /api/hall/
// @access    private
const deleteHall = async(req,res)=>{
try {
    //  Get the ID from the request parameters
    const _id = req.params.id;
  
    // Find the floor by ID and delete it
    const DeletedHall = await hallModel.findByIdAndDelete({_id});

    // Check if the floor was found and deleted
    if(!DeletedHall) return res.status(400).json({err:"Hall Not Found"});

  return res.status(200).json({msg:"Hall deleted Successfully",DeletedHall});
} catch (error) {
 console.log(`Error Deleteing Hall ${error}`);
 return res.status(500).json({err:"Internal Server Error"})   
}
}


module.exports = {createHall,getHall,deleteHall,updateHall}