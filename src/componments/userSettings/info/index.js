import React, { memo, useState } from 'react'
import { Box, InputBase, Typography, InputLabel, MenuItem, FormControl, Select } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import i18next from "i18next";

const useStyles = makeStyles((theme) => {
    return {
        infoBox: {
            width:"100%",
            marginTop: "20px",
            borderRadius: "16px",
            background: "#393939",
        },
        borderBox: {
            marginTop:"20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "55px",
            borderRadius: "16px",
            background: "#333333",
            padding: "0 10px"
        },
        nameInputBox: {
            width:"100%",
            display: "flex",
            alignItems: "center"
        },
        userTextStyle: {
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            letterSpacing: "0px",
            textAlign: "left",
            color: "#FFFFFF"
        },
        inputStyle:{
            width: "100%",
            margin: "0 15px",
            padding:"0 15px",
            color: "#FFFFFF",
            border: (props) => (props.nameEditStatus ? "" : "1px solid #FFFFFF") ,
            borderRadius:"16px"
        },
        editStyle: {
            fontFamily: " PingFang SC",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            letterSpacing: "0px",
            textAlign: "right",
            color: "#FFFFFF",
            cursor: "pointer"
        },
        doneStyle: {
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: "600",
            lineHeight: "22px",
            letterSpacing: "0px",
            textAlign: "right",
            color: "#FFFFFF",
            cursor:"pointer"
        },
        selectStyle: {
            minWidth: "120px",
            background: "#3D3D3D",
            border: "1px solid #3A3A3A",
            borderRadius: "12px",
            padding:"0 8px"
        }
    };
});
const InfoSetting = () => {
    
    const [nameValue, setNameValue] = useState("");
    const [nameEditStatus, setNameEditStatus] = useState(true);
    const [genderValue, setGenderValue] = useState(1);
    const [value, setValue] = React.useState(new Date('2014-08-18T21:11:54'));

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    const classes = useStyles({
        nameEditStatus: nameEditStatus
    });

    const handleNameChange = (e) => {
        setNameValue(e.target.value)
    }

    const handleGenderChange = (e) => {
        setGenderValue(e.target.value);
    }

    const rendernameEditStatus = () => {
        return <>
            {nameEditStatus ? (
                <Typography
                    className={classes.editStyle}
                    onClick={() => {
                        setNameEditStatus(false);
                    }}
                >
                    {i18next.t("Edit")}
                </Typography>
            ) : (
                <Typography className={classes.doneStyle} 
                        onClick={() => {
                            setNameEditStatus(true);
                        }}>
                    {i18next.t("Done")}
                </Typography>
            )}
        </>
    }


    return (
        <Box className={classes.infoBox}>
            <Box className={classes.borderBox}>
                <Box className={classes.nameInputBox}>
                    <Typography className={classes.userTextStyle}>
                        {i18next.t("UserName")}
                    </Typography>
                    <InputBase
                        type="search"
                        max={12}
                        defaultValue={nameValue}
                        disabled={nameEditStatus}
                        onChange={handleNameChange}
                        className={classes.inputStyle}
                    />
                </Box>
                <Box>
                    {rendernameEditStatus()}
                </Box>
            </Box>
            <Box className={classes.borderBox}>
                <Typography className={classes.userTextStyle}>
                    {i18next.t("Gender")}
                </Typography>
                <Box className={classes.selectStyle}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={genderValue}
                            onChange={handleGenderChange}
                            style={{color: "#FFFFFF"}}
                        >
                            <MenuItem value={1} >{i18next.t("Male")}</MenuItem>
                            <MenuItem value={2} >{i18next.t("Female")}</MenuItem>
                            <MenuItem value={3} >{i18next.t("Other")}</MenuItem>
                            <MenuItem value={4} >{i18next.t("Secret")}</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    )
}

export default memo(InfoSetting);