const boothModel = require("../models/boothModel");

// @Request   GET
// @Route     /api/booth/
// @access    private
const getBooth = async(req,res)=>{
try {
    const Booths = await boothModel.find();

    if(!Booths) return res.status(404).json({err:"No Booths Found"});

    return res.status(200).json(Booths);
} catch (error) {
    console.log(`Error Reading Booths ${error}`);
    return res.status(500).json({err:"Internal Server Error"});
}
}

// @Request   Post
// @Route     /api/booth/
// @access    private
const createBooth = async(req,res)=>{
    try {
        // Destructure the request body
        const { boothname,boothhall} = req.body;

        // Regular expressions for validation
        const boothNameRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the name contains only letters , numbers and spaces and disallow special characters.

        // Validation chack
        if(!boothNameRegex.test(boothname)) return res.status(400).json({err:"Invalid Booth Name.only letter's , number's and spaces are allowed."})

            const BoothExistance = await boothModel.findOne({boothname});

            if(BoothExistance) return res.status(400).json({err:"Booth already exists"});

            const createBooth = await boothModel.create({boothname,boothhall});

            return res.status(201).json({msg:"Booth Added Successfully",createBooth});
    } catch (error) {
        console.log(`Error Creating Booth ${error}`);
        return res.status(500).json({err:"Internal Server Error"});
    }
}

// @Request   delete
// @Route     /api/booth/
// @access    private
const deleteBooth = async(req,res)=>{
    try {
        const _id = req.params.id;

        const deleteBooth = await boothModel.findByIdAndDelete({_id});

        if(!deleteBooth) return res.status(400).json({err:"Booth Not Found"});

        return res.status(201).json({msg:"Booth deleted Successfully",deleteBooth});
    } catch (error) {
        console.log(`Error Deleting Booth ${error}`);
        return res.status(500).json({err:"Internal Server Error"});
    }


}

// @Request   Put
// @Route     /api/booth/
// @access    private
const updateBooth = async(req,res)=>{
    try {
         // Destructure the request body
         const { boothname,boothhall} = req.body;

         // Regular expressions for validation
         const boothNameRegex = /^[A-Za-z0-9\s]+$/; // Ensures that the name contains only letters , numbers and spaces and disallow special characters.
 
         // Validation chack
         if(!boothNameRegex.test(boothname)) return res.status(400).json({err:"Invalid Booth Name.only letter's , number's and spaces are allowed."})
 
            const _id = req.params.id;

             const BoothExistance = await boothModel.findOne({_id});
 
             if(!BoothExistance) return res.status(400).json({err:"Booth not found"});

             const updateBooth = {
                boothname,
                boothhall
             }
 
             const updatedBooth = await boothModel.findByIdAndUpdate(_id,updateBooth,{new:true});
 
             return res.status(201).json({msg:"Booth Updated Successfully",updatedBooth});
    } catch (error) {
        console.log(`Error Updating Booth ${error}`);
        return res.status(500).json({err:"Internal Server Error"});
    }
}
module.exports = {getBooth,createBooth,deleteBooth,updateBooth}