import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { bookVisit } from "../../api/Details";
import { DatePicker } from "@mantine/dates";
import { Modal, Button } from "@mantine/core";

const Booking = ({ propertyId, userEmail, onBookingSuccess, isBooked }) => {
	const [opened, setOpened] = useState(false);
	const [bookingDate, setBookingDate] = useState(null);
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const handleBookVisit = async () => {
		if (!bookingDate) {
			toast.error("Please select a date for your visit.");
			return;
		}

		const selectedDate = new Date(bookingDate);
		if (selectedDate < today) {
			toast.error("You cannot book a date that has already passed.");
			return;
		}

		if (isBooked) {
			toast.error("You are already booked for this residency.");
			return;
		}

		try {
			console.log("Booking visit for:", { userEmail, propertyId, bookingDate });
			await bookVisit(userEmail, propertyId, bookingDate);
			toast.success("You have successfully booked your visit!"); 
			console.log("Booking success"); 
			onBookingSuccess(true);
			setOpened(false);
		} catch (error) {
			const errorMessage =
				error.response?.data?.message || "Unknown error occurred.";
			if (
				error.response?.status === 409 &&
				errorMessage.includes("already booked")
			) {
				toast.error("You are already booked for this residency.");
			} else {
				toast.error(errorMessage);
			}
		}
	};

	return (
		<div>
			<button
				onClick={() => setOpened(true)}
				className="rounded-lg border bg-blue-950 p-2 text-white font-bold w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105"
			>
				Book your Visit
			</button>

			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Select your date of visit"
				centered
			>
				<div className="flexColCenter" style={{ gap: "1rem" }}>
					<DatePicker
						label="Select a date for your visit"
						placeholder="Pick a date"
						value={bookingDate}
						onChange={setBookingDate}
						minDate={today}
					/>
					<Button disabled={!bookingDate} onClick={handleBookVisit}>
						Confirm Booking
					</Button>
				</div>
			</Modal>
			<ToastContainer />
		</div>
	);
};

export default Booking;
