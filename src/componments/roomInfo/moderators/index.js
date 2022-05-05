import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar, Button, Typography } from "@material-ui/core";
import acaratIcon from '../../../assets/images/subtractLive.png'


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

const Moderators = () => {
  const classes = useStyles();
  const adminList = useSelector(state => state?.roomAdmins) || [];
  return (
    <Box className={classes.root}>
      {
        adminList.length > 0 && adminList.map((item, i) => {
          return <Button className={classes.listItem} key={i}>
            <Box className={classes.memberStyle}>
              <Avatar src={acaratIcon} className={classes.acaratStyle}></Avatar>
              <Typography className={classes.memberTextStyle} >{item}</Typography>
            </Box>
          </Button>
        })
      }
    </Box>
  )
}
export default memo(Moderators);