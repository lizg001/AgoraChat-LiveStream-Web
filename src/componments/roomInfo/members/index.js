import React, { useState, memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar, Button, Typography, List } from "@material-ui/core";
import ListItemButton from '@mui/material/ListItemButton';
import Menus from './menus'
import WebIM from '../../../utils/WebIM'
import { isChatroomAdmin } from '../../common/contants'
import acaratIcon from '../../../assets/images/defaultAvatar.png'
import menusIcon from '../../../assets/images/menu.png'
import streamerIcon from '../../../assets/images/streamer.png'
import moderatorIcon from '../../../assets/images/moderator.png'
import muteIcon from '../../../assets/images/mute.png'
const useStyles = makeStyles((theme) => {
    return {
        root: {
            overflow: "hidden",
            height: "426px",
            width:"350px"
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
        listItemStyle: {
            height: "54px",
            width: "calc(100% - 10px)",
            borderRadius: "12px",
            padding:"0 10px",
            background: (props) => (props.hideMenus ? "#393939" : ""),
            display: "flex",
            justifyContent: "space-between",
            marginTop:"4px",
            position: "relative"
        },
        memberStyle: {
            display: "flex",
            alignItems: "center",
            width:"100%"
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
            cursor: "pointer",
            position: "absolute",
            right: "40px",
        },
        userInfoBox:{
            marginLeft:"10px"
        },
        roleStyle:{
            display: "flex",
            marginTop:"4px"
        },
        iconStyle:{
            width:"61px",
            height:"16px"
        }
    }
});
const Members = ({ roomMembers }) => {
    const [hideMenus, setHideMenus] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectUserId, setSelectUserId] = useState("")
    const classes = useStyles(
        hideMenus,
    );
    const roomMemberInfo = useSelector(state => state?.roomMemberInfo) || {};
    const roomOwner = useSelector(state => state?.roomInfo?.owner) || "";
    let roomMembersObj = Object.keys(roomMembers);
    const currentLoginUser = WebIM.conn.context.userId;
    const handleMenus = (e, item) => {
        console.log('>>>>>');
        e.preventDefault();
        setAnchorEl(e.currentTarget);
        setSelectUserId(item)
    }
    const handleMenusClose = () => {
        setAnchorEl(null);
    };
    return ( 
        <Box className={classes.root}>
            <List className={classes.listBox}>
                {roomMembersObj.length > 0 && roomMembersObj.map((item, i) => {
                    let mySelf = currentLoginUser === item;
                    let isRoomAdmins = roomOwner === item || isChatroomAdmin(item)
                    return <Button className={classes.listItemStyle} key={i}>
                        <Box className={classes.memberStyle} onMouseOver={() => { setHideMenus(true) }}
                            onMouseLeave={() => { setHideMenus(false) }}>
                            <Avatar src={roomMemberInfo[item]?.avatarurl || acaratIcon} className={classes.acaratStyle}></Avatar>
                            <Box className={classes.userInfoBox}>
                                <Box className={classes.roleStyle}>
                                    <Typography className={classes.memberTextStyle} >{roomMemberInfo[item]?.nickname || item}</Typography>
                                    {roomMembers[item]?.isMuted && <img src={muteIcon} alt="" className={classes.iconStyle}/>}
                                </Box>
                                <Box className={classes.roleStyle}>
                                    {roomMembers[item]?.isStreamer && <img src={streamerIcon} alt="" />}
                                    {roomMembers[item]?.isAdmin && <img src={moderatorIcon} alt="" />}
                                </Box>
                            </Box>
                        </Box>
                        {/* hideMenus && !isRoomAdmins && !mySelf &&  */}
                        {<Box className={classes.menuStyle} onClick={(e) => handleMenus(e, item)}>
                            <img src={menusIcon} alt="" />
                        </Box>}
                    </Button>
                })}
            </List>
            <Menus open={anchorEl} onClose={handleMenusClose} selectUserId={selectUserId} />
        </Box>
    )
}
export default memo(Members);