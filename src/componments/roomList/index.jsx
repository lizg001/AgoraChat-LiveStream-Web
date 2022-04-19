import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Avatar, Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EaseApp } from 'chat-uikit-live';
import i18next from "i18next";
import { joinRoom } from '../../api/room'
import aaa from '../../assets/images/aaa.png'
import { padding } from '@mui/system';
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
            cursor: "pointer"
        },
        itemLeft: {
            paddingLeft: "5px"
        },
        itemStyle: {
            width: "225px",
            height: "225px"
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
    const handleJoinRoom = (roomId) => {
        joinRoom(roomId, addSessionItem)
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
                    return (
                        <Box key={i} className={classes.itemLeft} onClick={() => handleJoinRoom(item.id)}>
                            <Box className={classes.itemStyle}>
                                {item.name}
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}
export default memo(RoomList);