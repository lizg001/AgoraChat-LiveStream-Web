import React,{ memo } from 'react'
import { Box, Avatar, Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import video from '../../assets/images/video.png'

const useStyles = makeStyles((theme) => {
    return {

    }
});
const VideoPlayer = () => {
    return ( 
        <Box >
            <img src={video} alt="" style={{ height: '400px' }}/>
        </Box>
    )
}

export default memo(VideoPlayer);