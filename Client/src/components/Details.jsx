import { useEffect, useState } from "react";
import { getDetails, deleteResidence } from "../api/Details";
import { useLocation } from "react-router-dom";
import swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShower, faBed, faCar, faLocationPinLock } from '@fortawesome/free-solid-svg-icons';
import Map from "./Map";

function Details() {
  const {pathname}=useLocation();
  const id =pathname.split("/").slice(-1)[0];
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    const residency = properties.find((property) => property._id === propertyId);
    if (residency) {
      const userEmail = "mukhtarhamza294@gmail.com";//test
      if ( userEmail === residency.userEmail) {
        await deleteResidence(propertyId);
        swal.fire("Success", "residency Deleted", "success");
        fetchProperties();
      } else {
        swal.fire("Error", "You are not authorized to delete this residency", "error");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (error) {
    console.error('Error fetching properties:', error);
    swal.fire("Error", "Failed fetching properties", "error");
    return null; // or <div>Error occurred</div>
  }

  return (
    <div className="container mx-auto p-8 flex justify-center items-start gap-5 w-full">
      {properties.map(property => (
        <div key={property._id} className="property-card">
          <div>
            <img src={property?.image} alt={property?.title} className="h-[32rem] w-full rounded-xl object-cover"/>
            <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="content flex flex-col justify-center items-start gap-8">
                <div className="flex items-center justify-between w-full">
                  <p className="text-xl font-bold text-blue-950">{property?.title}</p>
                  <p className="text-lg text-blue-800 font-bold">${property?.price}</p>
                </div>
                <div className="flex items-center justify-start w-full gap-6">
                  <div className="bathrooms">
                    <p><FontAwesomeIcon icon={faShower} /> {property?.facilities?.bathrooms} Bathrooms</p>
                  </div>
                  <div className="bedrooms">
                    <p><FontAwesomeIcon icon={faBed} /> {property?.facilities?.bedrooms} Room</p>
                  </div>
                  <div className="parking">
                    <p><FontAwesomeIcon icon={faCar} /> {property?.facilities?.parkings} parking</p>
                  </div>
                </div>
                <div>
                  <p className="Description text-gray-700 tex-lg">{property?.description}</p>
                  <p className="address text-blue-950 mt-4"><FontAwesomeIcon icon={faLocationPinLock} /> {property?.address}, {property?.city}, {property?.country}</p>
                  <button className="rounded-lg border bg-blue-950 p-2 text-white font-bold w-full mt-7 transition duration-300 ease-in-out transform hover:scale-105">
                    Book your Visit
                  </button>
                  <button onClick={() => handleDelete(property._id)} className="rounded-lg border bg-red-900 p-2 text-white font-bold">Delete</button>
                </div>
              </div>
              {property?.address && property?.city && property?.country ? (
                <Map address={property.address} city={property.city} country={property.country} />
              ) : (
                <p>Location information is missing.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Details;
