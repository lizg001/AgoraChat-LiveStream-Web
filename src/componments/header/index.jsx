import React,{ memo } from 'react'
import { Box, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import i18next from "i18next";
import agoraAvatar from '../../assets/Subtractlive.png'

const useStyles = makeStyles((theme) => {
    return {
        root: {
            height: "64px",
            width: "100%",
            left: "0px",
            top: "144px",
            background: "#393939",
        },
        headerStyle:{
            height:"100%",
            width:"100%",
            display:'flex',
            alignItems: "center",
            paddingLeft:"15px"
        },
        avatarStayle:{
            width:'40px',
            height:"40px",
            background:"red",
            borderRadius:"50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        avatarStyle:{
            width: "32px", 
            height: "32px"
        },
        titleStyle:{
            height: "28px",
            width: "auto",
            fontFamily:"Baloo Tamma",
            fontWeight:"400",
            fontSize:"24px",
            lineHeight:"28px",
            color:"#FFFFFF",
            marginLeft:"8px"
        }
    }
});

const Header = () => {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <Box className={classes.headerStyle}>
                <Box className={classes.avatarStayle}>
                    <Avatar src={agoraAvatar} className={classes.avatarStyle}></Avatar>
                </Box>
                <Typography className={classes.titleStyle}>{i18next.t('Agora LiveStream')}</Typography>
            </Box>
        </Box>
    )
}

export default memo(Header);