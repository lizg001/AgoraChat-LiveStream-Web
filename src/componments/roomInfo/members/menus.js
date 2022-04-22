import React, { memo } from "react";
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Popover, List, Typography } from "@material-ui/core";
import ListItemButton from '@mui/material/ListItemButton';
import i18next from "i18next";
// import store from '../../../redux/store'
import { addRoomWhiteUser, addRoomMuted, addRoomBlock } from '../../../api/room'

import allowIcon from '../../../assets/images/allow.png'
import pauseIcon from '../../../assets/images/pause.png'
import muteIcon from '../../../assets/images/mute.png'
import banIcon from '../../../assets/images/ban.png'


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
        marginLeft:"10px"
    }
}));

const Menus = ({ open, onClose, selectUserId }) => {
    const classes = useStyles();
    const roomId = useSelector(state => state?.roomInfo.id);

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
                    onClick={() => { addRoomWhiteUser(roomId, selectUserId, onClose)}}>
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
                   
                >
                    <img src={pauseIcon} alt="" className={classes.iconStyle} />
                    <Typography className={classes.textStyle}>
                        {i18next.t("Timeout")}
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    className={classes.itemStyle}
                    onClick={() => { addRoomMuted(roomId, selectUserId, onClose) }}
                >
                    <img src={muteIcon} alt="" className={classes.iconStyle} />
                    <Typography className={classes.textStyle}>
                        {i18next.t("Mute")}
                    </Typography>
                </ListItemButton>
                <ListItemButton
                    className={classes.itemStyle}
                    onClick={() => { addRoomBlock(roomId, selectUserId, onClose) }}
                >
                    <img src={banIcon} alt="" className={classes.iconStyle} />
                    <Typography className={classes.textStyle}>
                        {i18next.t("Ban")}
                    </Typography>
                </ListItemButton>
            </List>
        </Popover>
    );
};

export default memo(Menus);
