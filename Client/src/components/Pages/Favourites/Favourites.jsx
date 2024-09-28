import "./Favourites.css";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllFavorites, removeFavorite } from "../../../api/Details";
import { useNavigate } from "react-router-dom"; 

export default function Favorites() {
	const [favorites, setFavorites] = useState([]);
	const [error, setError] = useState(null);
	const navigate = useNavigate(); 

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const email = "marwaharonnn@gmail.com";
				const data = await getAllFavorites(email);
				setFavorites(data);
			} catch (error) {
				console.error("Error fetching favorites:", error);
				setError("Failed to fetch favorites");
			}
		};

		fetchFavorites();
	}, []);

	const handleRemoveFavorite = async (id) => {
		try {
			const email = "marwaharonnn@gmail.com";
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

	if (error) return <div>{error}</div>;

	return (
		<div className="container mx-auto p-8">
			{favorites.length === 0 ? (
				<p className="text-center">No favorites available.</p>
			) : (
				favorites.map((fav) => (
					<div
						key={fav.id}
						className="property-card border p-4 rounded-lg shadow-lg flex cursor-pointer"
						onClick={() => handleCardClick(fav.id)} 
					>
						<img
							src={fav.image}
							alt={fav.title}
							className="w-1/3 h-24 object-cover rounded-lg"
						/>
						<div className="ml-4 flex-1">
							<h3 className="text-lg font-bold">{fav.title}</h3>
							<p className="text-gray-700">Price: ${fav.price}</p>
							<button
								onClick={(e) => {
									e.stopPropagation(); 
									handleRemoveFavorite(fav.id);
								}}
								className="rounded-lg border bg-red-900 p-2 text-white font-bold mt-4"
							>
								Remove
							</button>
						</div>
					</div>
				))
			)}
			<ToastContainer />
		</div>
	);
}
