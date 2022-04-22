import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

// import i18next from "i18next";

const useStyles = makeStyles((theme) => {
    return {
        root: {
            
        },
    }
});
const Muted = () => {
    const classes = useStyles();
    const memberMuteList = useSelector(state => state?.roomBans) || [];
    return (
        <Box className={classes.root}>
            {
                memberMuteList.length > 0 ? memberMuteList.map((item, i) => {
                    return <Box key={i}>{item}</Box>
                }) : <>暂无数据</>
            }
        </Box>
    )
}
export default memo(Muted);