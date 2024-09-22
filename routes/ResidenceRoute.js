import express from "express";
import{
    create,
    getAllResidencies,
    getResidencybyId,
    update,
    deleteresidency,
}
from "../controller/Residencycontroller.js";
const route=express.Router();
route.post("/Residency",create);
route.get("/Residencies",getAllResidencies);
route.get("/Residency/:id",getResidencybyId);
route.put("/residency/:id", update);
route.delete("/residency/:id", deleteresidency);


export default route;