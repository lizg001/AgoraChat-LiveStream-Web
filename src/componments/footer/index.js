import React, { memo } from 'react'
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import i18next from "i18next";
import agoraLogo from '../../assets/images/agoralogo.png'
import subtractIcon from '../../assets/images/subtract.png'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            height: "92px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        copyrightStyle: {
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "400",
            lineHeight: "20px",
            letterSpacing: "0px",
            textAlign: "left",
            color: "#FFFFFF"
        },
        versionStyle: {
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0px",
            marginLeft: "10px"
        },
        linkStyle: {
            fontFamily: "Roboto",
            fontSize: "14px",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "0px",
            textAlign: "left",
            color: "#2F80ED",
            marginLeft: "15px",
            cursor: "pointer"
        }
    }
})
const Footer = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box>
                <Typography className={classes.copyrightStyle}>© 2022 Agora.</Typography>
                <Box style={{ display: "flex" }}>
                    <Typography className={classes.versionStyle}>SDK Version v1.0.0</Typography>
                    <Typography className={classes.versionStyle}>UI Library Version v1.0.0</Typography>
                    <Typography className={classes.linkStyle}>
                        {/* <a href="http://" className={classes.linkStyle}></a> */}
                        Agora Chat Demo
                    </Typography>
                    <Typography className={classes.linkStyle}>
                        {/* <a href="http://" className={classes.linkStyle}></a> */}
                        Agora Chat Demo
                    </Typography>
                    <Typography className={classes.linkStyle}>
                        {/* <a href="http://" className={classes.linkStyle}></a> */}
                        Agora Chat Demo
                    </Typography>
                </Box>
            </Box>
            <Box>
                <img src={subtractIcon} alt="" />
                <img src={agoraLogo} alt="" />
            </Box>
        </Box>
    )
}

export default memo(Footer);