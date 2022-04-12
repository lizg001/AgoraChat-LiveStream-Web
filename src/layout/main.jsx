import React from 'react';
import { EaseLivestream } from 'chat-uikit-live';
import Box from '@mui/material/Box';
import Header from '../componments/header'
import RoomList from '../componments/roomList'

export default function Main(params) {
    return (
        <Box>
            <Header />
            <Box style={{ height: '500px',padding:"5px,10px"}}>
                <EaseLivestream />
            </Box>
            <RoomList />
        </Box>
    )
}
