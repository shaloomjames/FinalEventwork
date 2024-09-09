const floorModel = require("../models/floorModel");

// @Request   GET
// @Route     /api/floor/
// @access    private
const getFloor = async(req,res)=>{
    try {
        const UserCount = await floorModel.find();

        if(!UserCount) return res.status(400).json({err:"No data Found"});

        return res.status(200).json(UserCount);
    } catch (error) {
        console.log(`Error Reading Floor ${error}`);
        return res.status(500).json({err:"Internal Server Error"});
    }
}

// @Request   POST
// @Route     /api/floor/
// @access    private
const createFloor = async(req,res)=>{
try {
    // Destructure the request body
    const {floorname} = req.body;
     
    // Regular expressions for validation
    const floorNameRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the name contains only letters , numbers and spaces and disallow special characters.

    // Validation chack
    if(!floorNameRegex.test(floorname)) return res.status(400).json({err:"Invalid Name.only letter's , number's and spaces are allowed."});

    const floorExistCheck = await floorModel.findOne({floorname});
    if(floorExistCheck) return res.status(400).json({err:"floor already exist's"});

    const floor = await floorModel.create({floorname});
    
    return res.status(200).json({msg:"Floor Added Successfully"});
} catch (error) {
    console.log(`Error creating Floor ${error}`)
    return res.status(500).json({err:"Internal Server Error"});
}
}

// @Request   Put
// @Route     /api/floor/:id
// @access    private
const updateFloor = async(req,res)=>{
try {
      // Destructure the request body
      const {floorname} = req.body;
     
      // Regular expressions for validation
      const floorNameRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the name contains only letters , numbers and spaces and disallow special characters.
  
      // Validation chack
      if(!floorNameRegex.test(floorname)) return res.status(400).json({err:"Invalid Name.only letter's , number's and spaces are allowed."});

      const _id = req.params.id;
    
      const existingFloor = await floorModel.findOne({_id});
      
      if(!existingFloor) return res.status(400).json({err:"Floor not found"});

      const UpdateFloor = {
        floorname
      }
    // findByIdAndUpdate require three arguments   
      const UpdatedFloor = await floorModel.findByIdAndUpdate(_id,UpdateFloor,{new:true})

      return res.status(201).json({msg:"Floor Updated Successfull",UpdatedFloor});
    

} catch (error) {
    console.log(`Error Updating Floor`);
    return res.status(500).json({err:"Internal Server Error"});
}
}


// @Request   delete
// @Route     /api/floor/:id
// @access    private
const deleteFloor = async(req,res)=>{
try {
    //  Get the ID from the request parameters
    const _id = req.params.id;

    // Find the floor by ID and delete it
    const deletedFloor = await floorModel.findByIdAndDelete({_id})
    
    // Check if the floor was found and deleted
    if(!deletedFloor) return res.status(400).json({err:"Floor not found"});

    return res.status(200).json({msg:"Floor deleted successful",deleteFloor});
} catch (error) {
    console.log(`Error Deleting Floor`);
    return res.status(500).json({err:"Internal Server Error"});
}
}

module.exports = {createFloor,getFloor,deleteFloor,updateFloor} 