import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { getAllBookings, cancelBooking } from "../../../api/Details";
import { useNavigate } from "react-router-dom";
import "./Booking.css";

function Bookings() {
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
				prevBookings.filter((booking) => booking._id !== bookingId)
			);
			toast.success("Booking canceled successfully!");
		} catch (error) {
			console.error("Error canceling booking:", err);
			toast.error("Failed to cancel booking");
		}
	};

	const handleCardClick = (bookingId) => {
		navigate(`/properties/${bookingId}`);
	};

	useEffect(() => {
		fetchBookings();
	}, []);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error fetching bookings: {error.message}</div>;

	return (
		<div className="container mx-auto p-8">
			{bookings.length === 0 ? (
				<p className="text-center">No bookings available.</p>
			) : (
				bookings.map((booking) => (
					<div
						key={booking.id}
						className="property-card border p-4 rounded-lg shadow-lg flex cursor-pointer"
						onClick={() => handleCardClick(booking.id)}
					>
						<img
							src={booking.image}
							alt={booking.title}
							className="w-1/3 h-24 object-cover rounded-lg"
						/>{" "}
						<div className="ml-4 flex-1">
							<h3 className="text-lg font-bold">{booking.title}</h3>
							<p className="text-gray-700">Price: ${booking.price}</p>
							<p className="text-gray-500">
								Booking Date: {new Date(booking.date).toLocaleDateString()}
							</p>
							<button
								onClick={() => {
									handleCancelBooking(booking.id);
								}}
								className="rounded-lg border bg-red-900 p-2 text-white font-bold mt-4"
							>
								Cancel Booking
							</button>
						</div>
					</div>
				))
			)}
			<ToastContainer />
		</div>
	);
}

export default Bookings;
