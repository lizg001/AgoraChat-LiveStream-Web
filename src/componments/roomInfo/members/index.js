import React, { useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar, Button, Typography } from "@material-ui/core";
import Menus from './menus'
// import i18next from "i18next";
import WebIM from '../../../utils/WebIM'
import { isChatroomAdmin, currentLoginUser } from '../../common/contants'
import acaratIcon from '../../../assets/images/defaultAvatar.png'
import menusIcon from '../../../assets/images/menu.png'
import streamerIcon from '../../../assets/images/streamer.png'
import moderatorIcon from '../../../assets/images/moderator.png'
import muteIcon from '../../../assets/images/mute.png'
const useStyles = makeStyles((theme) => {
    return {
        root: {
            overflow: "hidden",
            height: "426px"
        },
        acaratStyle: {
            width: "40px",
            height: "40px"
        },
        listBox: {
            overflowY: "scroll",
            overflowX: "hidden",
            height: "100%",
            cursor: "pointer"
        },
        listItem: {
            height: "54px",
            width: "100%",
            borderRadius: "12px",
            background: (props) => (props.hideMenus ? "#393939" : ""),
            display: "flex",
            justifyContent: "space-between",
        },
        memberStyle: {
            display: "flex",
            alignItems: "center"
        },
        memberTextStyle: {
            // paddingLeft: "5px",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "18px",
            letterSpacing: "0px",
            color: "#FFFFFF",
            width: "180px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textAlign: "left",
            textTransform: "none"
        },
        menuStyle: {
            cursor: "pointer"
        },
        userInfoBox:{
            marginLeft:"10px"
        },
        roleStyle:{
            display: "flex",
        }
    }
});
const Members = ({ roomMembers }) => {
    console.log('roomMembers>>>', roomMembers);
    const [hideMenus, setHideMenus] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectUserId, setSelectUserId] = useState("")
    const classes = useStyles(
        hideMenus,
    );
    const roomMemberInfo = useSelector(state => state?.roomMemberInfo) || {};
    const roomOwner = useSelector(state => state?.roomInfo?.owner) || "";
    let roomMembersObj = Object.keys(roomMembers);
    const handleMenus = (e, item) => {
        setAnchorEl(e.currentTarget);
        setSelectUserId(item)
    }
    const handleMenusClose = () => {
        setAnchorEl(null);
    };
    return ( 
        <Box className={classes.root}>
            <Box
                className={classes.listBox}
                onMouseOver={() => { setHideMenus(true) }}
                onMouseLeave={() => { setHideMenus(false) }}
            >
                {roomMembersObj.length > 0 && roomMembersObj.map((item, i) => {
                    let mySelf = currentLoginUser === item;
                    let isRoomAdmins = roomOwner === item || isChatroomAdmin(item)
                   
                    return <Button className={classes.listItem} key={i}>
                        <Box className={classes.memberStyle}>
                            <Avatar src={roomMemberInfo[item]?.avatarurl || acaratIcon} className={classes.acaratStyle}></Avatar>
                            <Box className={classes.userInfoBox}>
                                <Box className={classes.roleStyle}>
                                    <Typography className={classes.memberTextStyle} >{roomMemberInfo[item]?.nickname || item}</Typography>
                                    {roomMembers[item]?.isMuted && <img src={muteIcon} alt="" />}
                                </Box>
                                <Box className={classes.roleStyle}>
                                    {roomMembers[item]?.isStreamer && <img src={streamerIcon} alt="" />}
                                    {roomMembers[item]?.isAdmin && <img src={moderatorIcon} alt="" />}
                                </Box>
                            </Box>
                        </Box>
                        {!isRoomAdmins && !mySelf && <Box className={classes.menuStyle} onClick={(e) => handleMenus(e, item)}>
                            <img src={menusIcon} alt="" />
                        </Box>}
                    </Button>
                })}
            </Box>
            <Menus open={anchorEl} onClose={handleMenusClose} selectUserId={selectUserId} />
        </Box>
    )
}
export default memo(Members);