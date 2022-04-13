import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

import i18next from "i18next";

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
            color: "#FFFFFF"
        }
    }
});
const Muted = () => {
    const classes = useStyles();
    const memberList = useSelector(state => state?.roomInfo.affiliations) || [];
    return (
        <div>暂无数据</div>
    )
}
export default memo(Muted);