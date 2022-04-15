import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Box, Avatar, Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EaseApp } from 'chat-uikit-live';
import i18next from "i18next";
import roomApi from '../../api/room'
import aaa from '../../assets/images/aaa.png'
const useStyles = makeStyles((theme) => {
    return {
        root: {
            overflow: "hidden",
            background:"#E5E5E5"
        },
        titleBox: {
            display: "flex",
            paddingLeft: "20px",
            alignItems: "center"
        },
        inputStyle: {
            marginLeft:'10px'
        },
        roomBox: {
            display: "flex",
            width: "100%",
            overflowX: "scroll",
            cursor:"pointer"
        },
        itemLeft:{
            paddingLeft: "5px"
        },
        itemStyle:{
            width: "225px", 
            height: "225px"
        }
    }
});

const RoomList = () => {
    const classes = useStyles();
    const roomList = useSelector(state => state?.rooms) || [];

    const addSessionItem = (roomId) => {
        let session = {
            conversationType: "groupChat",
            conversationId: roomId,
        };
        EaseApp.addConversationItem(session);
    };
    const handleJoinRoom = (roomId) => {
        console.log('roomId>>>',roomId);
        roomApi.joinRoom(roomId, addSessionItem)
    }

    
    return (
        <Box className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography>{i18next.t('Stream Channels')}</Typography>
                <InputBase
                    type="search"
                    placeholder={i18next.t("Member ID")}
                    className={classes.inputStyle}
                />
            </Box>
            <Box className={classes.roomBox}>
                {roomList.length > 0 && roomList.map((item, i) => {
                    return (
                        <Box key={i} className={classes.itemLeft} onClick={() => handleJoinRoom(item.id)}>
                            <Box className={classes.itemStyle}>
                                <img src={aaa} alt="" />
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}
export default memo(RoomList);