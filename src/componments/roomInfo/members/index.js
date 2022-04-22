import React, { useState, memo } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, ListItem, ListItemText, Avatar, Button, Typography } from "@material-ui/core";
// import ListItemButton from '@mui/material/ListItemButton';
import Menus from './menus'
// import i18next from "i18next";
import WebIM from '../../../utils/WebIM'

import acarat from '../../../assets/images/subtractLive.png'
import menusIcon from '../../../assets/images/menu.png'
const useStyles = makeStyles((theme) => {
    return {
        root: {
            overflow: "hidden",
            height: "426px"
        },
        acaratStyle: {
            width: "24px",
            height: "24px"
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
            paddingLeft: "5px",
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
    let currentLoginUser = WebIM.conn.context.userId || "";
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
                {roomMembers.length > 0 && roomMembers.map((item, i) => {
                    let mySelf = currentLoginUser === item
                    return <Button className={classes.listItem} key={i}>
                        <Box className={classes.memberStyle}>
                            <Avatar src={acarat} className={classes.acaratStyle}></Avatar>
                            <Typography className={classes.memberTextStyle} >{item}</Typography>
                        </Box>
                        {!mySelf && <Box className={classes.menuStyle} onClick={(e) => handleMenus(e, item)}>
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