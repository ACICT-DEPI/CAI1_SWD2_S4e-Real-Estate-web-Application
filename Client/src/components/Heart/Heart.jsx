import React, { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { toggleFavorite } from '../../api/Details'; 
import { toast } from 'react-toastify';

const Heart = ({ id, isFavourite: initialIsFavourite, onToggle }) => {
  const [isFavourite, setIsFavourite] = useState(initialIsFavourite); 

  const handleToggleFavorite = async (event) => {
    event.stopPropagation(); 

    try {
      await toggleFavorite(id); 

      setIsFavourite((prevFavorite) => {
        const newFavoriteState = !prevFavorite;
        

        if (newFavoriteState) {
          toast.success('Added to favorites!');
        } else {
          toast.info('Removed from favorites!');
        }

        return newFavoriteState; 
      });

      if (onToggle) {
        onToggle(id);
      }
    } catch (error) {
      console.error('Error updating favorite status:', error);
      toast.error('Failed to update favorite status.');
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
