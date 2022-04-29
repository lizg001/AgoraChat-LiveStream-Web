import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Box, Avatar, Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReactPlayer from 'react-player'
import WebIM from '../../utils/WebIM'
import store from '../../redux/store'
import { clearGigtMsgAction } from '../../redux/actions'

import { giftObj } from '../common/contants'
import defaultAvatar from '../../assets/images/panda.png'
const useStyles = makeStyles((theme) => {
    return {
        videoBox: {
            width: "300px !important",
            height: "420px !important"
        },
        giftBox: {
            height: "100px",
            position: "absolute",
            bottom: "30px",
            left: "20px",
        },
        giftMsgStyle: {
            height: "36px",
            borderRadius: "30px",
            display: "flex",
            marginTop: "15px"
        },
        userBox: {
            marginLeft: "8px"
        },
        giftUserStyle: {
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "18px",
            letterSpacing: "0.15px",
            textAlign: "left",
            color: "#FFFFFF"
        },
        giftNameStyle: {
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "14px",
            letterSpacing: "0.15px",
            textAlign: "left",
            color: "#FFFFFFBD"
        },
        giftImg: {
            width: "32px",
            height: "32px",
            marginLeft: "8px",
        },
        giftNumberStyle: {
            fontFamily: "Roboto",
            fontSize: "24px",
            fontStyle: "italic",
            fontWeight: "900",
            lineHeight: "32px",
            letterSpacing: "0.15px",
            textAlign: "left",
            color: "#FFFFFF",
            marginLeft: "8px"
        }
    }
});
const VideoPlayer = () => {
    const classes = useStyles();
    const liveCdnUrl = useSelector(state => state?.liveCdnUrl) || "https://127.0.0.1";
    const giftMsgs = useSelector(state => state?.giftMsgs) || [];
    let isGiftMsg = Object.keys(giftMsgs).length > 0;
    let currentLoginUser = WebIM.conn.context.userId;

    const clearGigtMsg = (id) => {
        let timerId = id;
        timerId = setTimeout(() => {
            store.dispatch(clearGigtMsgAction(id));
            clearTimeout(timerId);
        }, 3000);
    }
    return (
        <Box style={{ position: "relative" }} >
            <Box>
                <ReactPlayer
                    url={liveCdnUrl}
                    className={classes.videoBox}
                    playing={true}
                />
            </Box>
            <Box className={classes.giftBox}>
                {isGiftMsg && giftMsgs.map((item, i) => {
                    let { id, customExts, from } = item;
                    let { gift_id, gift_num } = customExts;
                    let { gift_img, gift_name} = giftObj[gift_id];
                    clearGigtMsg(id);
                    return (
                        <Box k={i} className={classes.giftMsgStyle}>
                            <Box>
                                <Avatar src={defaultAvatar} ></Avatar>
                            </Box>
                            <Box className={classes.userBox}>
                                <Typography className={classes.giftUserStyle}>{from ? from : currentLoginUser}</Typography>
                                <Typography className={classes.giftNameStyle}>{gift_name}</Typography>
                            </Box>
                            <img
                                className={classes.giftImg}
                                src={require(`../../assets/gift/${gift_img}`)}
                                alt=""
                            />
                            <Box>
                                <Typography className={classes.giftNumberStyle}>{`x${gift_num}`}</Typography>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}

export default memo(VideoPlayer);