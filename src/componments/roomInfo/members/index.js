import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box, List, ListItem, ListItemText, Avatar } from "@material-ui/core";
import ListItemButton from '@mui/material/ListItemButton';

import i18next from "i18next";

import acarat from '../../../assets/images/subtractLive.png'
import { color, height } from '@mui/system';
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
            height: "100%"
        },
        memberStyle: {
            paddingLeft: "10px",
            fontFamily: "Roboto",
            fontsize: "14px",
            fontWeight: "500",
            lineHeight: "18px",
            letterSpacing: "0px",
            textAlign: "left",
            color:"#FFFFFF"
        }
    }
});
const Members = () => {
    const classes = useStyles();

    const memberList = useSelector(state => state?.roomInfo.affiliations) || [];
    console.log('memberList>>>', memberList);
    return (
        <Box className={classes.root}>
            {memberList.length > 0 && memberList.map((item, i) => {
                return (
                    <List>
                        <ListItem disablePadding>
                            <Avatar src={acarat} className={classes.acaratStyle}></Avatar>
                            <ListItemButton>
                                <ListItemText primary={item.member} className={classes.memberStyle} />
                            </ListItemButton>
                        </ListItem>
                    </List>)
            })}
        </Box>
    )
}
export default memo(Members);