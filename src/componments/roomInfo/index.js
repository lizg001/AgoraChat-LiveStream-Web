import React, { useState, memo } from 'react'
import { Box, Typography, InputBase } from "@material-ui/core";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { TabPanel, a11yProps } from '../common/tab'
import { makeStyles } from "@material-ui/core/styles";
import i18next from "i18next";
import Members from './members'
import Moderators from './moderators'
import Allowed from './allowed'
import Ban from './ban'
import Muted from './muted'
import store from '../../redux/store'
import { miniRoomInfoAction } from '../../redux/actions'

import searchIcon from '../../assets/images/search.png'
import closeIcon from '../../assets/images/close.png'

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            width: "340px",
            height: "520px",
            borderRadius: "16px",
            border: "1px solid",
        },
        titleBox: {
            width:"calc(100% - 20px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "60px",
            background: "#3D3D3D",
            padding: "0 10px",
            borderRadius: "12px 12px 0 0"
        },
        titleText: {
            height: "24px",
            fontFamily: "Roboto",
            fontSize: "18px",
            fontWeight: "600",
            lineHeight: "24px",
            letterSpacing: "0px",
            color: "#FFFFFF"
        },
        tabStyle: {
            color: "#FFFFFF"
        },
        textStyle: {
            textTransform: "none",
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            letterSpacing: "0px",
            textAlign: "center",
            color: "#FFFFFF"
        },
        iconBox:{
            display: "flex",
            alignItems:"center",
            // padding:"0 10px 0 0 "
        },
        iconStyle: {
            width: "30px",
            height: "30px",
            cursor: "pointer"
        },
        searchBox: {
            width: "200px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "30px",
            padding: "0 !important",
        },
        inputStyle: {
            borderRadius: "16px",
            border: "1px solid #FFFFFF",
            padding: "0 8px",
            marginRight: "4px",
            color:"#FFFFFF"
        },
        cancelStyle:{
            textTransform: "none",
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "600",
            lineHeight: "22px",
            letterSpacing: "0px",
            textAlign: "center",
            color: "#FFFFFF",
            cursor:"pointer"
        }
    })
});




const RoomInfo = () => {
    const classes = useStyles();
    const [value, setValue] = useState(1);
    const [showSearch, setShowSearch] = useState(false);
    const [searchValue, setSearchValue] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChengeValue = (e) => {
        setSearchValue(e.target.value);
    };

    const handleSearch = () => {
        setShowSearch(true);
    };

    const handleClosrSearch = () => {
        setShowSearch(false);
    };

    const handleCloseInfoChange = () => {
        console.log('aaa');
        store.dispatch(miniRoomInfoAction(true))
    }

    return (
        <Box className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography className={classes.titleText} >{i18next.t("Viewers")}</Typography>
                <Box className={classes.iconBox}>
                    {!showSearch && <img src={searchIcon} alt="" className={classes.iconStyle} onClick={handleSearch}/>}
                    {showSearch && (
                        <Box className={classes.searchBox}>
                            <InputBase
                                type="search"
                                placeholder={i18next.t("search")}
                                className={classes.inputStyle}
                                onChange={handleChengeValue}
                            />
                            <Typography
                                onClick={handleClosrSearch}
                                className={classes.cancelStyle}
                            >
                                {i18next.t("Cancel")}
                            </Typography>
                        </Box>
                    )}
                    <img src={closeIcon} alt="" className={classes.iconStyle} onClick={() => handleCloseInfoChange()}/>
                </Box>
                
            </Box>
            <Box className={classes.tabsBox}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    // allowScrollButtonsMobile
                    aria-label="scrollable force tabs example"
                    className={classes.tabStyle}
                >
                    <Tab label={i18next.t('All')} {...a11yProps(0)} className={classes.textStyle} />
                    <Tab label={i18next.t('Moderators')} {...a11yProps(1)} className={classes.textStyle} />
                    <Tab label={i18next.t('Allowed')} {...a11yProps(2)} className={classes.textStyle} />
                    <Tab label={i18next.t('Muted')} {...a11yProps(3)} className={classes.textStyle} />
                    <Tab label={i18next.t('Ban')} {...a11yProps(4)} className={classes.textStyle} />

                </Tabs>
                <TabPanel value={value} index={0} >
                    <Members />
                </TabPanel>
                <TabPanel value={value} index={1} >
                    <Moderators />
                </TabPanel>
                <TabPanel value={value} index={2} >
                    <Allowed />
                </TabPanel>
                <TabPanel value={value} index={3} >
                    <Muted />
                </TabPanel>
                <TabPanel value={value} index={4} >
                    <Ban />
                </TabPanel>
            </Box>
        </Box>

    );
}

export default memo(RoomInfo)