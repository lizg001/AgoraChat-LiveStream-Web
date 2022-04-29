import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography, InputBase } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { EaseApp } from 'chat-uikit-live';
import i18next from "i18next";
import { joinRoom } from '../../api/room'
import { getLiveCdnUrl } from '../../api/liveCdn'
import { defaultAvatarUrl } from '../common/contants'
import lrsImg from '../../assets/images/lrs.png'
const useStyles = makeStyles((theme) => {
    return {
        root: {
            overflow: "hidden",
            // background: "#292929",
            padding: " 20px 0"
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
            position: "relative",
            height: "180px",
            width: "180px",
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
        },
        lrsInfoBox: {
            position: "absolute",
            bottom: "10px",
            left: "10px"
        },
        nameStyle: {
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "20px",
            letterSpacing: "0em",
            textAlign: "left",
            color: "#FFFFFF"
        },
        lrsBox: {
            display: "flex",
            alignItems: "center"
        },
        lrsNameStyle: {
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: "400",
            lineHeight: "16px",
            letterSpacing: "0em",
            textAlign: "left",
            color: "#FFFFFF",
            width: "120px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            marginLeft: "10px"
        }
    }
});

const RoomList = () => {
    const classes = useStyles();
    const roomList = useSelector(state => state?.rooms) || [];
    const [searchValue, setSearchValue] = useState('')
    let roomsLength = roomList.length > 0;
    
    const addSessionItem = (roomId) => {
        let session = {
            conversationType: "chatRoom",
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
        setSearchValue(searchValue);
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
                    let { cover, id, name, owner } = item
                    return (
                        <Box key={i} className={classes.itemStyle} onClick={() => handleJoinRoom(id)}>
                            <img src={cover || defaultAvatarUrl} alt="" className={classes.liveImgStyle} />
                            <Box className={classes.lrsInfoBox}>
                                <Typography className={classes.nameStyle}>{name}</Typography>
                                <Box className={classes.lrsBox}>
                                    <img src={lrsImg} alt="" />
                                    <Typography className={classes.lrsNameStyle}>{owner}</Typography>
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>
    )
}
export default memo(RoomList);