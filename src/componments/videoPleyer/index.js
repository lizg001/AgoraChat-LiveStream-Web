import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Box, Avatar, Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from 'react-player'


import video from '../../assets/images/video.png'
import defaultAvatar from '../../assets/images/panda.jpg'
const useStyles = makeStyles((theme) => {
    return {

    }
});
const VideoPlayer = () => {
    const classes = useStyles();
    const liveCdnUrl = useSelector(state => state?.liveCdnUrl) || "https://127.0.0.1";
    const giftMsgs = useSelector(state => state?.giftMsgs) || {};
    let isGiftMsg = Object.keys(giftMsgs).length > 0;
    return (
        <Box >
            <Box>
                {/* <img src={video} alt="" style={{ height: '400px' }} /> */}
                <ReactPlayer controls url={liveCdnUrl} autoplay />
                {/* <video src={liveCdnUrl} autoplay controls></video> */}
            </Box>
            {/* <Box>
                {isGiftMsg && Object.keys(giftMsgs).map((item,i) => {
                    console.log('item>>>',item);
                    return (
                        <Box>
                            <Box>
                                <Avatar src={defaultAvatar} ></Avatar>
                            </Box>
                            <Box>
                                <Typography>AAA</Typography>
                            </Box>
                            <Box>
                                <img
                                    className={classes.priceImg}
                                    src="../../assets/gift/pinkHeart.png"
                                    // src={goldCoins ? require(`../../assets/gift/${goldCoins}`) : goldIcon}
                                    alt=""
                                />
                            </Box>
                            <Box>
                                <Typography>x99</Typography>
                            </Box>
                        </Box>
                    )
                })}
            </Box> */}
        </Box>
    )
}

export default memo(VideoPlayer);