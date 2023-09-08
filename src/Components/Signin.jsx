import React, { useEffect, useState } from 'react'
import { auth, provider } from '../GoogleSignin/Config';
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import AllRoutes from './AllRoutes'
import NavBar from './Navbar';
import { Button, Center, Heading, VStack } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

export default function Signin() {
    const [value, setValue] = useState('');
    const navigate = useNavigate();

    const handleSignin = () => {
        signInWithPopup(auth, provider).then((data) => {
            setValue(data.user.email);
            localStorage.setItem("email", data.user.email);
            navigate('/');
        })
    }

    useEffect(() => {
        const email = localStorage.getItem("email");
        if (email) {
            setValue(email);
        }
    }, []);

    // const handleLogout = () => {
    //     localStorage.clear();
    //     window.location.reload();
    // }

    return (
        <div>
            {
                value ?
                    <div>
                        <AllRoutes />
                        {/* <Button onClick={handleLogout}>Logout</Button> */}
                        <NavBar />
                    </div>
                    :
                    <Center mt={"200px"}>
                        <VStack>
                            <Heading color={"blackAlpha.800"}>Welcome to MovieList</Heading>
                            <Button boxShadow='lg' mt={"30px"} size='lg' onClick={handleSignin}>Sign in with Google &nbsp;<FcGoogle style={{background:"none"}} size={"30px"}/></Button>
                        </VStack>
                    </Center>
            }
        </div>
    )
}
