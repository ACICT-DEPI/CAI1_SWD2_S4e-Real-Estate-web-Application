import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";
import { getAllFavorites } from "../../../api/Details";
import { getAllProperties } from "../../../api/Properties";
import Heart from "../../Heart/Heart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../../context/AuthProvider";

export default function Properties() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  const fetchProperties = async () => {
    try {
      const response = await getAllProperties();
      const propertiesWithFavorites = response.map(property => ({ ...property, isFavourite: false }));
  
      if (auth?.email) {
        const favoritesResponse = await getAllFavorites(auth.email);
        const favoriteIds = new Set(favoritesResponse.map(fav => fav.id.toString())); 
  
        propertiesWithFavorites.forEach(property => {
          property.isFavourite = favoriteIds.has(property._id); 
        });
      }
  
      setData(propertiesWithFavorites);
      setFilteredData(propertiesWithFavorites); 
    } catch (error) {
      console.error('Error fetching properties:', error);
      setError('Failed to load properties. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []); 
  const handleToggleFavorite = (id) => {
    setFilteredData((prevFilteredData) =>
      prevFilteredData.map((property) => {
        if (property._id === id) {
          return { ...property, isFavourite: !property.isFavourite }; 
        }
        return property;
      })
    );
  };
  const handleSearch = (query) => {
    if (!query) {
      setFilteredData(data);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filteredResults = data.filter(card => {
        const matchesTitle = card.title.toLowerCase().includes(lowerCaseQuery);
        const matchesPrice = card.price.toString().includes(lowerCaseQuery);
        const matchesLocation = card.city.toLowerCase().includes(lowerCaseQuery) || card.country.toLowerCase().includes(lowerCaseQuery);
        return matchesTitle || matchesPrice || matchesLocation;
      });
      setFilteredData(filteredResults);
    }
  };

  if (loading) {
    return <div>Loading properties...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <div className="properties-container p-5 m-5">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="container my-5">
        <div className="row">
          {filteredData.length > 0 ? (
            filteredData.map((card) => (
              <div className="col-md-3 mb-4 d-flex align-items-stretch" key={card._id}>
                <div className="card" style={{ borderRadius: "10px" }}>
                  <div className="like" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }}>
                    <Heart
                      id={card._id}
                      isFavourite={card.isFavourite}
                      onToggle={handleToggleFavorite}
                      isAuthenticated={Boolean(auth?.accessToken)}
                      email={auth?.email}
                    />
                  </div>
                  <Link to={`/properties/${card._id}`} style={{ textDecoration: 'none' }}>
                    <img src={card.image} className="card-img-top w-100" alt={card.title} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="price">
                        <span>$</span>
                        {card.price}
                      </h5>
                      <span className="name">{card.title}</span>
                      <span className="detail">
                        {card.address}, {card.city}, {card.country}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center" style={{ fontWeight: "bolder", fontSize: "20px", color: "rgb(50, 50, 63)" }}>
              No properties found matching your search
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
