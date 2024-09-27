import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../SearchBar/SearchBar';
import { getAllProperties } from '../../../api/Properties';

export default function Properties() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProperties = async () => {
    try {
      const response = await getAllProperties();
      setData(response);
      setFilteredData(response);
      console.log(response);
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
          {filteredData && filteredData.length > 0 ? (
            filteredData.map((card, index) => (
              <div className="col-md-3 mb-4 d-flex align-items-stretch" key={index}>
                <Link to={`/properties/${card._id}`} className="card" style={{ textDecoration: 'none', borderRadius: "10px" }}>
                  <div className="card" style={{ borderRadius: "10px" }}>
                    <img src={card.image} className="card-img-top w-100" alt={card.title} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="price">
                        <span>$</span>{card.price}
                      </h5>
                      <span className="name">{card.title}</span>
                      <span className="detail">{card.address} {card.city} {card.country}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className='text-center' style={{ fontWeight: "bolder", fontSize: "20px", color: "rgb(50, 50, 63)" }}>
              No properties found matching your search
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
