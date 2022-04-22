import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return {
       root:{

       }
    }
});
const Allowed = () => {
    const classes = useStyles();
    const memberList = useSelector(state => state?.roomAllowed) || [];
    return (
        <Box className={classes.root}>
            {
                memberList.length > 0 ? memberList.map((item,i)=> {
                    return <Box key={i}>{item}</Box>
                }) : <>暂无数据</>
            }
        </Box>
    )
}
export default memo(Allowed);