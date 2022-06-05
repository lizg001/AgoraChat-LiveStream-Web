import React, { useState, memo } from "react";
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Popover, List, Typography, Box, Button } from "@material-ui/core";
import ListItemButton from '@mui/material/ListItemButton';
import i18next from "i18next";
// import store from '../../../redux/store'
import { addRoomWhiteUser, addRoomMuted, addRoomBlock } from '../../../api/room'

import allowIcon from '../../../assets/images/allow.png'
import pauseIcon from '../../../assets/images/pause.png'
import muteIcon from '../../../assets/images/mute.png'
import banIcon from '../../../assets/images/ban.png'
import closeIcon from '../../../assets/images/close.png'


const useStyles = makeStyles((theme) => ({
    root: {
        background: "#1A1A1A"
    },
    itemStyle: {
        background: "#393939",
        borderRadius: "12px"
    },
    iconStyle: {
        width: "20px",
        height: "20px",
    },
    textStyle: {
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "500",
        lineHeight: "20px",
        letterSpacing: "0px",
        textAlign: "left",
        color: "#FFFFFF",
        marginLeft: "10px"
    },
    popoverBox: {
        height: "180px",
        width: "420px",
        borderRadius: "12px",
        background: "#1A1A1A",
        position: "relative",
        display: "flex",
        paddingLeft: "10px"
    },
    closeStyle: {
        position: "absolute",
        right: "21px",
        top: "23px",
        width: "24px",
        height: "24px",
        cursor:"pointer"
    },
    renderTextStyle: {
        display: "flex",
        alignItems: "center",
        color: "#FFFFFF"
    },
    btnBox: {
        position: "absolute",
        bottom: "10px",
        right: "10px"
    },
    cancelBtnStyle: {
        background: "#393939",
        borderRadius: "26px",
        width: "84px",
        height: "36px",
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    okayBtnStyle: {
        background: "#114EFF",
        borderRadius: "26px",
        width: "84px",
        height: "36px",
        textTransform: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));

const Menus = ({ open, onClose, selectUserId }) => {
    const classes = useStyles();
    const roomId = useSelector(state => state?.roomInfo.id);
    const roomMemberInfo = useSelector(state => state?.roomMemberInfo) || {};
    const [anchorEl, setAnchorEl] = useState(null);
    const [clickType, setClickType] = useState("")
    const [clickUser, setClickUser] = useState("")
    const handleChange = (e, user, type) => {
        setAnchorEl(e.currentTarget);
        setClickType(type);
        setClickUser(user);
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const handleClick = (type,user) => {
        switch (type) {
            case "allow":
                addRoomWhiteUser(roomId, user, onClose)
                break;
            case "mute":
                addRoomMuted(roomId, user, onClose)
                break;
            case "ban":
                addRoomBlock(roomId, user, onClose)
                break;
            default:
                break;
        }
    }

    const RenderPopover = () => {
        return <Box className={classes.popoverBox}>
            <img src={closeIcon} alt="close popover" className={classes.closeStyle} onClick={() => { setAnchorEl(null) }}></img>
            <Typography className={classes.renderTextStyle}>{`want to ${clickType} ${roomMemberInfo[clickUser]?.nickname || clickUser} ?`}</Typography>
            <Box className={classes.btnBox}>
                <Button>
                    <Typography
                        className={classes.cancelBtnStyle}
                        onClick={() => { setAnchorEl(null) }}>
                        {i18next.t("Cancel")}
                    </Typography>
                </Button>
                <Button>
                    <Typography
                        className={classes.okayBtnStyle}
                        onClick={() => { handleClick(clickType, clickUser) }}>
                        {i18next.t("Okay")}
                    </Typography>
                </Button>
            </Box>
        </Box>
    }
    return (
        <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
        >
            <List component="nav" aria-label="main mailbox folders" className={classes.root}>
                <ListItemButton
                    className={classes.itemStyle}
                    onClick={(e) => handleChange(e, selectUserId, 'allow')}>
                    <img
                        src={allowIcon}
                        alt=""
                        className={classes.iconStyle}
                    />
                    <Typography className={classes.textStyle}>
                        {i18next.t("Move to Allower List")}
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    className={classes.itemStyle}
                    onClick={(e) => handleChange(e, selectUserId, 'mute')}
                >
                    <img src={pauseIcon} alt="" className={classes.iconStyle} />
                    <Typography className={classes.textStyle}>
                        {i18next.t("Timeout")}
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    className={classes.itemStyle}
                    onClick={(e) => handleChange(e, selectUserId, 'ban')}
                >
                    <img src={banIcon} alt="" className={classes.iconStyle} />
                    <Typography className={classes.textStyle}>
                        {i18next.t("Ban")}
                    </Typography>
                </ListItemButton>
            </List>
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <RenderPopover />
            </Popover>
        </Popover>
    );
};

export default memo(Menus);
