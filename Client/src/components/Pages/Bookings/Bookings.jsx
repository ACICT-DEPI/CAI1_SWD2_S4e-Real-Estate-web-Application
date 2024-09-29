import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAllBookings, cancelBooking } from "../../../api/Details";
import { useNavigate, Link } from "react-router-dom";

import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";

function Bookings() {
	const { setAuth } = useContext(AuthContext);

	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const fetchBookings = async () => {
		setLoading(true);
		try {
			const data = await getAllBookings("marwaharonnn@gmail.com");
			console.log("Fetched bookings:", data);
			setBookings(data);
		} catch (err) {
			setError(err);
			console.error("Error fetching bookings:", err);
			toast.error("Failed to fetch bookings");
		} finally {
			setLoading(false);
		}
	};

	const handleCancelBooking = async (bookingId) => {
		try {
			await cancelBooking("marwaharonnn@gmail.com", bookingId);
			setBookings((prevBookings) =>
				prevBookings.filter((booking) => booking.id !== bookingId)
			);
			toast.success("Booking canceled successfully!");
		} catch (error) {
			console.error("Error canceling booking:", error);
			toast.error("Failed to cancel booking");
		}
	};

	const handleCardClick = (id) => {
		navigate(`/properties/${id}`);
	};

	useEffect(() => {
		fetchBookings();
	}, []);

	if (loading) return <div className="text-center">Loading...</div>;
	if (error)
		return (
			<div className="text-red-600 text-center">
				Error fetching bookings: {error.message}
			</div>
		);

	return (
		<div className="container mx-auto p-8">
			<h2 className="text-2xl font-bold mb-6 text-center"><br /> <br />Your Bookings</h2>
			{bookings.length === 0 ? (
				<p className="text-center text-gray-500">No bookings available.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{bookings.map((booking) => (
						<div
							key={booking._id}
							className="property-card border border-gray-300 p-4 rounded-lg shadow-lg flex flex-col transition-transform transform hover:scale-105 cursor-pointer"
							onClick={() => handleCardClick(booking.id)}
						>
							<img
								src={booking.image}
								alt={booking.title}
								className="w-full h-48 object-cover rounded-lg mb-4"
							/>
							<div className="flex-1">
								<h3 className="text-lg font-bold">{booking.title}</h3>
								<p className="text-gray-700">Price: ${booking.price}</p>
								<p className="text-gray-500">
									Booking Date: {new Date(booking.date).toLocaleDateString()}
								</p>
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleCancelBooking(booking.id);
								}}
								className="mt-4 rounded-lg bg-red-600 p-2 text-white font-bold transition-colors hover:bg-red-700"
							>
								Cancel Booking
							</button>
						</div>
					))}
				</div>
			)}
			<ToastContainer />
		</div>
	);
}

export default Bookings;
