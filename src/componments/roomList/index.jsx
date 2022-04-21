import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Avatar, Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EaseApp } from 'chat-uikit-live';
import i18next from "i18next";
import { joinRoom } from '../../api/room'
import { getLiveCdnUrl, getLiveRoomInfo } from '../../api/liveCdn'
import defaultImg from '../../assets/gift/six.png'
const useStyles = makeStyles((theme) => {
    return {
        root: {
            overflow: "hidden",
            background: "#292929"
        },
        titleBox: {
            display: "flex",
            paddingLeft: "20px",
            alignItems: "center"
        },
        inputStyle: {
            marginLeft: '10px',
            background: "#3D3D3D",
            borderRadius: "16px",
            padding: "0 20px",
            color: "#FFFFFF"
        },
        roomBox: {
            display: "flex",
            width: "100%",
            overflowX: "scroll",
            marginTop: "10px",
            cursor: "pointer"
        },
        itemStyle: {
            // width: "200px",
            // height: "200px",
            marginLeft: "10px",
            borderRadius: "16px",
            border: "1px solid"
        },
        liveImgStyle: {
            width: "180px",
            height: "180px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
            // borderRadius: "16px",
            // border: "1px solid",
        },
        textStyle: {
            fontFamily: "Roboto",
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "24px",
            letterSpacing: "0px",
            textAlign: "left",
            color: "#FFFFFF"
        }
    }
});

const RoomList = () => {
    const classes = useStyles();
    const roomList = useSelector(state => state?.rooms) || [];
    let roomsLength = roomList.length > 0;

    const addSessionItem = (roomId) => {
        let session = {
            conversationType: "groupChat",
            conversationId: roomId,
        };
        EaseApp.addConversationItem(session);
    };
    const handleJoinRoom = (liveroomId) => {
        joinRoom(liveroomId, addSessionItem);
        getLiveCdnUrl(liveroomId);
        // getLiveRoomInfo(liveroomId)
    }

    const handleValueChange = (e) => {
        let searchValue = e.target.value;
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography className={classes.textStyle}>{i18next.t('Stream Channels')}</Typography>
                <InputBase
                    type="search"
                    placeholder={i18next.t("search")}
                    className={classes.inputStyle}
                    onChange={handleValueChange}
                />
            </Box>
            <Box className={classes.roomBox}>
                {roomsLength && roomList.map((item, i) => {
                    console.log('item>>>',item);
                    let { cover, description, id, name } = item
                    return (
                        <Box key={i} className={classes.itemStyle} onClick={() => handleJoinRoom(id)}>
                            <img src={cover || defaultImg} alt="" className={classes.liveImgStyle} />
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}
export default memo(RoomList);