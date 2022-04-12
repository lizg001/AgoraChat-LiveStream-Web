import React from 'react';
import { EaseLivestream } from 'chat-uikit-live';
import Box from '@mui/material/Box';
import Header from '../componments/header'


export default function Main(params) {
    return (
        <Box>
            <Header />
            <Box style={{ height: '500px'}}>
                <EaseLivestream />
            </Box>
        </Box>
    )
}
