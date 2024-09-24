import express from "express";
import {
	bookVisit,
	cancelBooking,
	createUser,
	getAllBookings,
	toFav,
	getAllFavorites,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.delete("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFavorites); 

export default router;
