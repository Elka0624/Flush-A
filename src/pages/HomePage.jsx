import { Box } from '@mui/material'
import React from 'react'
import back1 from '../assets/back2.webp'
import { LoginCard } from '../Components/LoginCard'

export const HomePage = () => {
    return (
        <>
            <Box sx={{ backgroundImage: `url(${back1})`, width: '100%', height: '100vh', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LoginCard />
            </Box>
        </>
    )
}
