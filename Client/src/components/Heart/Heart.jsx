import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { toggleFavorite } from '../../api/Details';
import { toast } from 'react-toastify';

const Heart = ({ id, isFavourite, onToggle, isAuthenticated, email }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleFavorite = async (event) => {
    event.stopPropagation();

    if (!isAuthenticated) {
      toast.error("You should login to add Favourites.");
      return;
    }

    try {
      const newFavoriteState = !isFavourite;
      await toggleFavorite(email, id);
      onToggle(id); 

      if (newFavoriteState) {
        toast.success('Added to favorites!');
      } else {
        toast.info('Removed from favorites!');
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      toast.error("An error occurred while updating favorites.");
    }
  };

  return (
    <AiFillHeart
      size={24}
      color={isFavourite || isHovered ? "#fa3e5f" : "white"}
      onClick={handleToggleFavorite}
      style={{
        cursor: 'pointer',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    />
  );
};

export default Heart;
