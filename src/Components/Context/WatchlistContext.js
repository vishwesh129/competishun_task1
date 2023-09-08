// WatchlistContext.js
import React, { createContext, useContext, useState } from 'react';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
    const [watchlistMovies, setWatchlistMovies] = useState(() => {
        const storedWatchlist = localStorage.getItem('watchlistMovies');
        return storedWatchlist ? JSON.parse(storedWatchlist) : [];
    });

    const addToWatchlist = (movie) => {
        setWatchlistMovies((prevWatchlist) => {
            const updatedWatchlist = [...prevWatchlist, movie];
            localStorage.setItem('watchlistMovies', JSON.stringify(updatedWatchlist));
            return updatedWatchlist;
        });
    };

    const removeFromWatchlist = (movie) => {
        setWatchlistMovies((prevWatchlist) => {
            const updatedWatchlist = prevWatchlist.filter((watched) => watched.id !== movie.id);
            localStorage.setItem('watchlistMovies', JSON.stringify(updatedWatchlist));
            return updatedWatchlist;
        });
    };

    return (
        <WatchlistContext.Provider
            value={{ watchlistMovies, addToWatchlist, removeFromWatchlist }}
        >
            {children}
        </WatchlistContext.Provider>
    );
};

export const useWatchlist = () => {
    return useContext(WatchlistContext);
};
