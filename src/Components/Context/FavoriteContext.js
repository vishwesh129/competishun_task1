// FavoriteContext.js
import React, { createContext, useContext, useState } from 'react';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favoriteMovies, setFavoriteMovies] = useState(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  const addFavoriteMovie = (movie) => {
    setFavoriteMovies((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, movie];
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavoriteMovie = (movie) => {
    setFavoriteMovies((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((fav) => fav.id !== movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteMovies, addFavoriteMovie, removeFavoriteMovie }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => {
  return useContext(FavoriteContext);
};
