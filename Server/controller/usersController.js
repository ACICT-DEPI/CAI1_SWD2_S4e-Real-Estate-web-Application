import User from '../model/User.js';
import Residency from "../model/Residency.js";
const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });
    res.json(users);
}

const deleteUser = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.body.id} not found` });
    }
    const result = await user.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}
export const bookVisit = async (req, res) => {
    const { email, residencyId, date } = req.body; 
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const residency = await Residency.findById(residencyId); 
        if (!residency) {
            return res.status(404).json({ message: "Residency not found" });
        }

        const alreadyBooked = user.bookedResidencies.includes(residencyId);
        if (alreadyBooked) {
            return res.status(400).json({ message: "Residency already booked" });
        }

        user.bookedResidencies.push(residencyId);
        await user.save();

        res.status(200).json({ message: "Residency successfully booked" });
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


export {
    getAllUsers,
    deleteUser,
    getUser
}
