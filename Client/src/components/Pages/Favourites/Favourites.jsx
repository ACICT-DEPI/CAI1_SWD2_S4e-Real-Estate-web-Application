import React, { useEffect, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllFavorites, removeFavorite } from "../../../api/Details";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthProvider";


export default function Favorites() {
	const [favorites, setFavorites] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const { auth } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchFavorites = async () => {
			setLoading(true);
			try {
				const email = auth?.email;
				const data = await getAllFavorites(email);
				setFavorites(data);
			} catch (error) {
				console.error("Error fetching favorites:", error);
				setError("Failed to fetch favorites");
			} finally {
				setLoading(false);
			}
		};

		fetchFavorites();
	}, [auth]);

	const handleRemoveFavorite = async (id) => {
		try {
			const email = auth?.email;
			await removeFavorite(email, id);
			setFavorites((prevFavorites) =>
				prevFavorites.filter((fav) => fav.id !== id)
			);
			toast.success("Removed from favorites!");
		} catch (error) {
			console.error("Error removing favorite:", error);
			toast.error("Failed to remove favorite.");
		}
	};

	const handleCardClick = (id) => {
		navigate(`/properties/${id}`);
	};

	if (loading) return <div className="text-center">Loading...</div>;
	if (error) return <div className="text-red-600 text-center">{error}</div>;

	return (
		<div className="container mx-auto p-8">
			<h2 className="text-2xl font-bold m-8 text-center">Your Favorites</h2>
			{favorites.length === 0 ? (
				<p className="text-center text-gray-500">No favorites available.</p>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{favorites.map((fav) => (
						<div
							key={fav.id}
							className="property-card border border-gray-300 p-4 rounded-lg shadow-lg flex flex-col transition-transform transform hover:scale-105 cursor-pointer"
							onClick={() => handleCardClick(fav.id)}
						>
							<img
								src={fav.image}
								alt={fav.title}
								className="w-full h-48 object-cover rounded-lg mb-4"
							/>
							<div className="flex-1">
								<h3 className="text-lg font-bold">{fav.title}</h3>
								<p className="text-gray-700">Price: ${fav.price}</p>
							</div>
							<button
								onClick={(e) => {
									e.stopPropagation();
									handleRemoveFavorite(fav.id);
								}}
								className="mt-4 rounded-lg bg-red-600 p-2 text-white font-bold transition-colors duration-200 ease-in-out hover:bg-red-700"

							>
								Remove
							</button>
						</div>
					))}
				</div>
			)}
			<ToastContainer />
		</div>
	);
}
