import { Box, Button, Center } from '@chakra-ui/react';
import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css';


export default function NavBar() {
    return (
        <div>
            <Center>
                <Box className="fixed-navbar">
                    <Button variant='ghost' className='no-hover-bg'><Link to="/">Movies</Link></Button>
                    <Button variant='ghost' className='no-hover-bg'><Link to="/favourites">Favourites</Link></Button>
                    <Button variant='ghost' className='no-hover-bg'><Link to="/watchlist">Watchlist</Link></Button>
                </Box>
            </Center>
        </div>
    )
}
