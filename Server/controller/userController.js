
import User from "../model/User.js";

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

		user.bookedVisits.push({ id, date });
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
	const { email } = req.body;
	const { rid } = req.params;

	try {
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const isFav = user.favResidenciesID.includes(rid);
		if (isFav) {
			user.favResidenciesID.pull(rid);
		} else {
			user.favResidenciesID.push(rid);
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
		const user = await User.findOne({ email }).select("favResidenciesID");
		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user.favResidenciesID);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
