import express from "express";
const router = express.Router();
import {
	getAllUsers,
	deleteUser,
	getUser,
	bookVisit,
	cancelBooking,
	getAllBookings,
	toFav,
	getAllFavorites,
	removeFav,
} from "../../controller/usersController.js";
import ROLES_LIST from "../../config/roles_list.js";
import verifyRoles from "../../middleware/verifyRoles.js";

router.post("/bookVisit/:id", bookVisit);
router.post("/allBookings", getAllBookings);
router.delete("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", getAllFavorites);
router.delete("/removeFav/:rid", removeFav);
router
	.route("/")
	.get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
	.delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getUser);

export default router;
