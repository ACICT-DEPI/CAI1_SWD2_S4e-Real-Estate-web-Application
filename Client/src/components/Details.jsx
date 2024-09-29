import { useEffect, useState } from "react";
import { getDetails, deleteResidence } from "../api/Details";
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
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

function Details() {
    const { setAuth } = useContext(AuthContext);
    
    const { pathname } = useLocation();
    const id = pathname.split("/").slice(-1)[0];
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedResidency, setSelectedResidency] = useState(null);
    const [isBooked, setIsBooked] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);

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

    useEffect(() => {
        fetchProperties();
    }, [id]);

    const handleDelete = async (propertyId) => {
        const residency = properties.find(
            (property) => property._id === propertyId
        );
        if (residency) {
            const userEmail = "mukhtarhamza294@gmail.com"; // test
            if (userEmail === residency.userEmail) {
                await deleteResidence(propertyId);
                swal.fire("Success", "Residency Deleted", "success");
                fetchProperties();
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
        const userEmail = "julianageorgeeshak@gmail.com"; 
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

    const toggleFavorite = () => {
        setIsFavourite((prev) => {
            const newFavouriteStatus = !prev;
            const msg = newFavouriteStatus
                ? "Added to favorites!"
                : "Removed from favorites!";
            swal.fire("Success", msg, "success"); 
            return newFavouriteStatus;
        });
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
                        <div className="m-7">
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
                                onClick={toggleFavorite}
                            >
                                <Heart
                                    id={property._id}
                                    isFavourite={isFavourite}
                                    onToggle={toggleFavorite}
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
                                        userEmail="marwaharonnn@gmail.com"
                                        onBookingSuccess={handleBookingState}
                                        isBooked={isBooked}
                                    />
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
