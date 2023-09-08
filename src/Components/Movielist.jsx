import React, { useState, useEffect } from 'react';
import { useFavorite } from './Context/FavoriteContext';
import { useWatchlist } from './Context/WatchlistContext';
import { Button, Center, HStack, Heading, Img, Input, Text } from '@chakra-ui/react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export default function Movielist() {
    const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } = useFavorite();
    const { watchlistMovies, addToWatchlist, removeFromWatchlist } = useWatchlist();

    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const handleModal = (movie) => {
        setSelectedMovie(movie);
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
    };

    const handlePlayNow = () => {
        alert("Movie Playing");
    };

    const toggleFavorite = (movie) => {
        const isFavorite = favoriteMovies.some((fav) => fav.id === movie.id);

        if (isFavorite) {
            removeFavoriteMovie(movie);
        } else {
            addFavoriteMovie(movie);
            alert("Movie added");
        }
    };

    const handleWatchlist = (movie) => {
        const isWatchlisted = watchlistMovies.some((watched) => watched.id === movie.id);

        if (isWatchlisted) {
            removeFromWatchlist(movie);
        } else {
            addToWatchlist(movie);
        }
    };

    const fetchData = () => {
        // Fetch all movies initially
        fetch('https://api.themoviedb.org/3/movie/popular?api_key=ee599bc93261085f014d3dcd63a34486')
            .then((res) => res.json())
            .then((data) => {
                console.log(data.results);
                setMovies(data.results);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Filter movies based on searchQuery and update searchResults
        const filteredMovies = movies.filter((movie) =>
            movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setSearchResults(filteredMovies);
    }, [searchQuery, movies]);

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div>
            <Center>
                <HStack alignItems={"center"} mt={"30px"} w={"40%"}> 
                    <Input 
                        type="text"
                        placeholder="Search movie name"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                    <Button onClick={handleLogout}>Logout</Button>
                </HStack>
            </Center>


            <Heading mt={"30px"}>Movies</Heading>
            <Center>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "15px", padding: "10px", width: "95%", margin: "auto", marginBottom: "50px" }}>
                    {searchResults.map((ele, index) => {
                        const isFavorite = favoriteMovies.some((fav) => fav.id === ele.id);

                        return (
                            <div key={index} style={{ backgroundColor: "#8caef5", padding: "20px", borderRadius: "5px", boxShadow: "rgba(0, 0, 0, 0.2) 0px 5px 15px" }}>
                                <Img src={ele.poster_path} alt='img' />
                                <Heading fontSize={"20px"} size='lg'>{ele.title}</Heading>
                                <Text>{ele.release_date}</Text>

                                <HStack mt={"30px"}>
                                    <Button onClick={() => { handleModal(ele) }}>Details</Button>
                                    <Button onClick={() => handleWatchlist(ele)}>
                                        {watchlistMovies.some((watched) => watched.id === ele.id)
                                            ? 'Remove'
                                            : 'Add to Watchlist'}
                                    </Button>
                                    {isFavorite ? (
                                        <AiFillHeart
                                            size={"30px"}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => toggleFavorite(ele)}
                                            color="red"
                                        />
                                    ) : (
                                        <AiOutlineHeart
                                            size={"30px"}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => toggleFavorite(ele)}
                                        />
                                    )}
                                </HStack>
                            </div>
                        );
                    })}
                </div>
            </Center>

            {selectedMovie && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>
                            &times;
                        </span>
                        <Img src={selectedMovie.poster_path} alt="Movie" />
                        <Text>{selectedMovie.title}</Text>
                        <Text>Overview : {selectedMovie.overview}</Text>
                        <Text>Release-Date :{selectedMovie.release_date}</Text>
                        <Text>Rating:{selectedMovie.vote_average}</Text>
                        <Button onClick={handlePlayNow}>PLAY NOW</Button>
                        <Button onClick={handleCloseModal}>Close</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
