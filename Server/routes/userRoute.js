// import express from "express";
import express from "express";
import {
	bookVisit,
	cancelBooking,
	getAllBookings,
	toFav,
	getAllFavorites,
	removeFav,
} from "../controller/usersController.js";

const router = express.Router();


router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.delete("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFavorites); 
router.delete("/removeFav/:rid", removeFav); 

export default router;
