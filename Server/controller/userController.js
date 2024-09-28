import User from "../model/User.js";
import Residency from "../model/Residency.js";
export const createUser = async (req, res) => {
	try {
		const { email } = req.body;
		const userExists = await User.findOne({ email });
		if (userExists) {
			return res.status(400).json({ message: "User already registered" });
		}

		const newUser = new User(req.body);
		const savedUser = await newUser.save();
		res
			.status(201)
			.json({ message: "User registered successfully", user: savedUser });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const bookVisit = async (req, res) => {
	const { email, date } = req.body;
	const { id } = req.params;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const alreadyBooked = user.bookedVisits.some(
			(visit) => visit.id.toString() === id
		);
		if (alreadyBooked) {
			return res
				.status(400)
				.json({ message: "This residency is already booked by you" });
		}

		const residency = await Residency.findById(id);
		if (!residency) {
			return res.status(404).json({ message: "Residency not found" });
		}

		user.bookedVisits.push({
			id,
			date,
			title: residency.title,
			price: residency.price,
			image: residency.image,
		});
		await user.save();
		res.send("Your visit is booked successfully");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getAllBookings = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email }).select("bookedVisits");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user.bookedVisits);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const cancelBooking = async (req, res) => {
	const { email } = req.body;
	const { id } = req.params;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const index = user.bookedVisits.findIndex(
			(visit) => visit.id.toString() === id
		);
		if (index === -1) {
			return res.status(404).json({ message: "Booking not found" });
		}

		user.bookedVisits.splice(index, 1);
		await user.save();
		res.send("Booking cancelled successfully");
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const toFav = async (req, res) => {
	const { rid } = req.params;

	try {
		const defaultUserId = "66f5bf9442f6195fe2aabe56";
		const user = await User.findById(defaultUserId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const residency = await Residency.findById(rid);
		if (!residency) {
			return res.status(404).json({ message: "Residency not found" });
		}

		const isFav = user.favResidencies.some((fav) => fav.id.toString() === rid);
		if (isFav) {
			user.favResidencies = user.favResidencies.filter(
				(fav) => fav.id.toString() !== rid
			);
		} else {
			user.favResidencies.push({
				id: residency._id,
				title: residency.title,
				price: residency.price,
				image: residency.image,
			});
		}

		await user.save();
		res.send({
			message: isFav ? "Removed from favorites" : "Added to favorites",
			user,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getAllFavorites = async (req, res) => {
	const { email } = req.body;

	try {
		const user = await User.findOne({ email }).select("favResidencies");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user.favResidencies);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const removeFav = async (req, res) => {
	const { email } = req.body;
	const { rid } = req.params;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const favoriteIndex = user.favResidencies.findIndex(
			(fav) => fav.id.toString() === rid
		);
		if (favoriteIndex === -1) {
			return res.status(404).json({ message: "Favorite not found" });
		}

		user.favResidencies.splice(favoriteIndex, 1);
		await user.save();
		res.status(200).json({ message: "Favorite removed successfully" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

