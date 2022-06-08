import React, { memo } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Box, List } from "@material-ui/core";
import MemberItem from './item'
import NoSearch from '../../common/noSearch'
const useStyles = makeStyles((theme) => {
    return {
        root: {
            overflow: "hidden",
            height: "480px",
            width: "350px"
        },
        acaratStyle: {
            width: "40px",
            height: "40px"
        },
        listBox: {
            overflowY: "scroll",
            overflowX: "hidden",
            height: "100%",
            cursor: "pointer"
        },
    }
});
const Members = ({ roomMembers }) => {
    const classes = useStyles();
    let roomMembersObj = Object.keys(roomMembers);
    return (
        <Box className={classes.root}>
            <List className={classes.listBox}>
                {roomMembersObj.length > 0 ? roomMembersObj.map((item, i) => {
                    return <MemberItem member={item} roomMembers={roomMembers} key={i} />
                }) : <NoSearch />}
            </List>
        </Box>
    )
}
export default memo(Members);
