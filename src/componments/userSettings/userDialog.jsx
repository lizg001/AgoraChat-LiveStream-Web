
import React, { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import i18next from "i18next";
import CommonDialog from '../common/dialog'
import { Box, Tabs, Tab, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { TabPanel, a11yProps } from "../common/tab";
import InfoSetting from './info'
import { defaultAvatarUrl } from '../common/contants'
import infoIcon from '../../assets/images/info.png'
import editIcon from '../../assets/images/edit.png'
const useStyles = makeStyles((theme) => {
    return ({
        root: {
            background: "red",
            color: "red"
        },
        userBox: {
            width: "880px",
            height: "680px",
            display: "flex",
            overflow: "hidden",
            background: "#393939"
        },
        infoBox:{
            width: "100%",
            display:"flex",
            justifyContent: "flex-start",
        },
        acatarBox: {
            display: "flex",
            justifyContent: "center",
            padding: "30px 40px",
            position: "relative"
        },
        avatarStyle: {
            height: "100px",
            width: "100px",
            borderRadius: "50px",
        },
        editBox:{
            position: "absolute",
            top: "65px",
            left: "115px",
            cursor: "pointer"
        },
        editAvatarStyle:{
            width: "24px",
        },
        menusText: {
            fontFamily: "Roboto",
            fontSize: "1px",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0px",
            textAlign: "left",
            textTransform: "none",
            color:"#FFFFFF"
        },
        iconStyle:{
            width:"24px",
            height:"24px"
        },
        contentStyle:{
            width:"70%",
            height:"100%"
        }
    })
});

const UserDialog = ({ open, onClose }) => {
    const classes = useStyles();
    const userInfo = useSelector(state => state?.userInfo) || {};
    const [value, setValue] = useState(0);
    const [userAvatar, setUserAvatar] = useState(userInfo.avatarurl)
    
    const couterRef = useRef();
    const handleAvatarChange = () => {
        couterRef.current.focus();
        couterRef.current.click();
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleUserAvatarChange = (e) => {
    }
   

    const infoLabel = () => {
        return (
            <Button className={classes.infoBox}>
                <img
                    src={infoIcon}
                    alt="info"
                    className={classes.iconStyle}
                ></img>
                <Typography className={classes.menusText}>
                    {i18next.t("Info")}
                </Typography>
            </Button>
        );
    };

    const renderDialog = () => {
        return (
            <Box className={classes.userBox}>
                <Box style={{ width: "30%" }}>
                    <Box className={classes.acatarBox} onClick={handleAvatarChange}>
                        <Avatar src={userAvatar || defaultAvatarUrl} className={classes.avatarStyle}>
                        </Avatar>
                        <Box className={classes.editBox}>
                            <img src={editIcon} alt="" className={classes.editAvatarStyle} />
                            <input
                                id="uploadImage"
                                type="file"
                                ref={couterRef}
                                style={{
                                    display: 'none',
                                }}
                                onChange={handleUserAvatarChange}
                            />
                        </Box>
                    </Box>
                    <Tabs
                        orientation="vertical"
                        // variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                    >
                        <Tab label={infoLabel()} {...a11yProps(0)} className={classes.menus} />

                    </Tabs>
                </Box>
                <TabPanel value={value} index={0} className={classes.contentStyle}>
                    <InfoSetting />
                </TabPanel>
            </Box>
        )
    }

    return (
        <CommonDialog
            open={Boolean(open)}
            onClose={onClose}
            title={i18next.t('Settings')}
            content={renderDialog()}
            maxWidth={880}
            className={classes.root}
        ></CommonDialog>
    )
}

export default UserDialog;