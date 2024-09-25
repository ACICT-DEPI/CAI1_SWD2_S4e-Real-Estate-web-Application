

import React from "react";
import { AiFillHeart } from "react-icons/ai";
import { toggleFavorite } from '../../api/Details'; 

const Heart = ({ id, isFavourite, onToggle }) => {
  const handleToggleFavorite = async (e) => {
    e.stopPropagation(); 

    try {
    
      await toggleFavorite(id);
      onToggle(); 
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={isFavourite ? "#fa3e5f" : "white"} 
      onClick={handleToggleFavorite}
      style={{ cursor: 'pointer' }} 
    />
  );
};

export default Heart;

