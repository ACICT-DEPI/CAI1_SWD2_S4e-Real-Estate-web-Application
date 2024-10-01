import { useEffect, useState, useContext } from "react";
import { getDetails, deleteResidence, getAllFavorites } from "../api/Details";
import { useLocation } from "react-router-dom";
import swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faShower,
	faBed,
	faCar,
	faLocationPinLock,
	faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Map from "./Map";
import Update from "./Update";
import Booking from "./Booking/Booking";
import Heart from "./Heart/Heart";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Details() {
	const { setAuth } = useContext(AuthContext);
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const id = pathname.split("/").slice(-1)[0];
	const [properties, setProperties] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedResidency, setSelectedResidency] = useState(null);
	const [isBooked, setIsBooked] = useState(false);
	const [isFavourite, setIsFavourite] = useState(false);
	const { auth } = useAuth();
	const fetchProperties = async () => {
		setLoading(true);
		try {
			const data = await getDetails(id);
			setProperties(Array.isArray(data) ? data : [data]);
			console.log(data);
		} catch (err) {
			setError(err);
		} finally {
			setLoading(false);
		}
	};


	const fetchFavorites = async () => {
        if (auth?.email) {
            try {
                const favoritesResponse = await getAllFavorites(auth.email);
                return new Set(favoritesResponse.map(fav => fav.id.toString())); 
            } catch (err) {
                console.error("Error fetching favorites:", err);
                return new Set(); 
            }
        }
        return new Set();
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchProperties();
            const favoriteIds = await fetchFavorites();
            setProperties((prevProperties) =>
                prevProperties.map(property => ({
                    ...property,
                    isFavourite: favoriteIds.has(property._id), 
                }))
            );
        };
        loadData();
    }, [id, auth]);

	const handleDelete = async (propertyId) => {
		const residency = properties.find(
			(property) => property._id === propertyId
		);
		if (residency) {
			const userEmail = auth.email;
			console.log("User Email:", userEmail);
			console.log("Residency User Email:", residency.userEmail);

			if (userEmail === residency.userEmail) {
				const result = await swal.fire({
					title: "Are you sure?",
					text: "You won't be able to revert this!",
					icon: "warning",
					showCancelButton: true,
					confirmButtonColor: "#d33",
					cancelButtonColor: "#3085d6",
					confirmButtonText: "Yes, delete it!",
					cancelButtonText: "No, cancel!",
				});

				if (result.isConfirmed) {
		
					try {
						await deleteResidence(propertyId);
						swal.fire("Deleted!", "Residency has been deleted.", "success");
						navigate("/properties");
					} catch (error) {
						console.error("Error deleting residency:", error);
						swal.fire("Error", "Failed to delete residency", "error");
					}
				}
			} else {
				swal.fire(
					"Error",
					"You are not authorized to delete this residency",
					"error"
				);
			}
		}
	};

	const handleUpdate = (property) => {
		const userEmail = auth.email;
		console.log("User Email:", userEmail);
		console.log("Residency User Email:", property.userEmail);
		if (userEmail === property.userEmail) {
			setSelectedResidency(property);
		} else {
			swal.fire(
				"Error",
				"You are not authorized to update this residency",
				"error"
			);
		}
	};

	const handleBookingState = (booked) => {
		setIsBooked(booked);
	};

    const handleToggleFavorite = async (id) => {
        setProperties((prevProperties) =>
            prevProperties.map((property) => {
                if (property._id === id) {
                    return { ...property, isFavourite: !property.isFavourite };
                }
                return property;
            })
        );
    
    };

	const handleHeartClick = (id) => {
		handleToggleFavorite(id);
	};
	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		console.error("Error fetching properties:", error);
		swal.fire("Error", "Failed fetching properties", "error");
		return null;
	}

	return (
		<div className="flex flex-col items-center xl:flex-row">
			<div className="container mx-auto p-8 flex flex-col items-center gap-5 w-full">
				{properties.map((property) => (
					<div
						key={property._id}
						className="property-card bg-white shadow-lg rounded-lg p-5 flex flex-col items-center w-full max-w-4xl"
					>
						<div className="mb-17">
							<h2 className="text-2xl font-bold">Details</h2>
						</div>
						<div style={{ position: "relative" }}>
							<img
								src={property?.image}
								alt={property?.title}
								className="w-[1000px] h-[400px] rounded-xl object-cover mb-4"
							/>
							<div
								className="like"
								style={{
									position: "absolute",
									top: "10px",
									right: "10px",
									zIndex: 1,
								}}
								onClick={handleToggleFavorite}
							>
								<Heart
									id={property._id}
									isFavourite={property.isFavourite}
									onToggle={(event) => handleHeartClick(property._id)}
									isAuthenticated={Boolean(auth?.accessToken)}
									email={auth?.email}
								/>
							</div>
						</div>
						<div className="flex flex-col lg:flex-row justify-between items-center gap-8 w-full">
							<div className="content flex flex-col justify-center items-start gap-4">
								<div className="flex items-center justify-between w-full">
									<p className="text-xl font-bold text-blue-950">
										{property?.title}
									</p>
									<p className="text-lg text-blue-800 font-bold">
										${property?.price}
									</p>
								</div>
								<div className="flex items-center justify-start w-full gap-6">
									<div className="bathrooms">
										<p>
											<FontAwesomeIcon icon={faShower} />{" "}
											{property?.facilities?.bathrooms} Bathrooms
										</p>
									</div>
									<div className="bedrooms">
										<p>
											<FontAwesomeIcon icon={faBed} />{" "}
											{property?.facilities?.bedrooms} Room
										</p>
									</div>
									<div className="parking">
										<p>
											<FontAwesomeIcon icon={faCar} />{" "}
											{property?.facilities?.parkings} parking
										</p>
									</div>
								</div>
								<div>
									<p className="Description text-gray-700 tex-lg">
										{property?.description}
									</p>
									<p className="address text-blue-950 mt-4">
										<FontAwesomeIcon icon={faLocationPinLock} />{" "}
										{property?.address}, {property?.city}, {property?.country}
									</p>
									<Booking
										propertyId={property._id}
										userEmail={auth.email}
										onBookingSuccess={handleBookingState}
										isBooked={isBooked}
									/>{" "}
									{auth.email === property.userEmail && (
										<>
											<button
												onClick={() => handleUpdate(property)}
												className="rounded-lg border bg-red-900 p-2 text-white font-bold mt-4"
											>
												Update
											</button>
											<button
												onClick={() => handleDelete(property._id)}
												className="rounded-lg border bg-red-900 p-2 text-white font-bold"
											>
												Delete
											</button>
										</>
									)}
								</div>
							</div>
							{property?.address && property?.city && property?.country ? (
								<Map
									address={property.address}
									city={property.city}
									country={property.country}
								/>
							) : (
								<p>Location information is missing.</p>
							)}
						</div>
					</div>
				))}
			</div>
			{selectedResidency && (
				<Update
					property={selectedResidency}
					onClose={() => setSelectedResidency(null)}
					fetchProperties={fetchProperties}
				/>
			)}
		</div>
	);
}

export default Details;
