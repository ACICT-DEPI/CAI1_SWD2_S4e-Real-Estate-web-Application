import Residency from '../model/Residency.js';


export const create= async(req,res)=>{
    try{
        const newResidency = new Residency(req.body);
        const {address} = newResidency;
        const residencyExist = await Residency.findOne({ address });
        if(residencyExist){
            return res.status(400).json({message:"Residency with this address already exists"});
        }
        const savedData = await newResidency.save();
        res.status(201).json({ message: "Residency created successfully", residency: savedData });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };

    export const getAllResidencies= async(req,res)=>{
        try{
            const residencies =await Residency.find().sort({createdAt:-1});
            res.status(200).json(residencies);
        } catch(error){
            res.status(500).json({ message: error.message });
        }
    } ;

    export const getResidencybyId=async(req,res)=>{
        try{
            const id = req.params.id;
            const residency = await Residency.findById(id);
            if(!residency){
                res.status(404).json({message:"Residency not found"});
            }
            res.status(200).json(residency);
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    };
    export const update=async(req,res)=>{
        try{
            const id=req.params.id;
            const residencyExist = await Residency.findById(id);
            if (!residencyExist) {
                return res.status(404).json({ message: "Residency not found" });
            }
            const updatedresidency = await Residency.findByIdAndUpdate(id, req.body, {
                new: true,
            });
            res.status(200).json({ message: "Residency updated " });
        }
        catch(error){
            res.status(500).json({ message: error.message });
        }
    };
    export const deleteresidency = async (req, res) => {
        try {
          const id = req.params.id;
          const residencyExist = await Residency.findById(id);
          if (!residencyExist) {
            return res.status(404).json({ message: "residency not found" });
          }
          await Residency.findByIdAndDelete(id);
          res.status(200).json({ message: "residency Deleted "});
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };