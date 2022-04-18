import React, { useState, memo } from 'react'
import { Box, Typography } from "@material-ui/core";
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

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            width: "340px",
            height: "520px",
            borderRadius: "16px",
            border: "1px solid",
        },
        titleBox: {
            display: "flex",
            alignItems: "center",
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
        tabsBox: {
            // backgroud: "#393939"
        },
        tabStyle:{
            color:"#FFFFFF"
        },
        textStyle: {
            textTransform: "none",
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            letterSpacing: "0px",
            textAlign: "center",
            color:"#FFFFFF"
        }
    })
});




const RoomInfo = () => {
    const classes = useStyles();
    const [value, setValue] = useState(1);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box className={classes.root}>
            <Box className={classes.titleBox}>
                <Typography className={classes.titleText} >{i18next.t("Viewers")}</Typography>
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