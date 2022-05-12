import React, { useState,memo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Popover, Box, Typography, InputBase } from "@material-ui/core";
import i18next from "i18next";
import { sendGiftsMsg } from '.././../api/giftMsg'
import goldIcon from '../../assets/gift/gold.png'
import heartIcon from '../../assets/gift/pinkHeart.png'

const useStyles = makeStyles((theme) => ({
    root: {
        height: "144px",
        width: "230px",
        borderRadius: "8px",
        border: "1px solid #4D4D4D",
        background: "#1A1A1A",
        padding: "10px"
    },
    giftBox: {
        display: "flex",
        alignItems: "center"
    },
    giftStyle: {
        marginLeft: "10px",
        background: "#333333",
        width: "80px",
        height: "80px",
        padding: "3px",
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    giftInfo: {
        margin: "10px 0 0 10px",
    },
    giftNameStyle: {
        fontFamily: "Roboto",
        fontSize: "16px",
        fontWeight: "600",
        lineHeight: "18px",
        letterSpacing: "0.15px",
        textalign: "left",
        color: "#FFFFFF"
    },
    giftPriceBox: {
        display: "flex",
        alignItems: "center",
    },
    priceText: {
        fontFamily: "Roboto",
        fontSize: "12px",
        fontWeight: "600",
        lineHeight: "16px",
        letterSpacing: "0.15px",
        color: "#FFFFFF",
        margin: "10px"
    },
    inputStyle: {
        width: "100%",
        height: "32px",
        padding: "8px",
        borderRadius: "16px",
        border: "1px solid #666666",
        color: "#FFFFFF"
    },
    giftImg: {
        width: "62px",
        height: "56px"
    },
    priceImg: {
        width: "16px",
        height: "16px"
    },
    privateBox: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "15px"
    },
    propertyBox: {
        display: "flex",
        alignItems: "center"
    },
    btnStyle: {
        height: "30px",
        width: "80px",
        borderRadius: "16px",
        background: "linear-gradient(to right, red , yellow);",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "& hover": {
            background: "#FFFFFF"
        }
    },
    sendTextStyle: {
        fontFamily: "Roboto",
        fontSize: "14px",
        fontWeight: "600",
        lineHeight: "14px",
        letterSpacing: "0px",
        color:"#FFFFFF"
    }

}));

const SenfGifts = ({ open, onClose, selectGift }) => {
    const classes = useStyles();
    let { gift_img, gift_name, gift_price, goldCoins, clickStatus } = selectGift;
    const [inputValue, setInputValue] = useState(1)
    const [clickFlag, setClickFlag] = useState(true)
    const handleInputBaseValue = (e) => {
        let value = e.target.value;
        if (value <= 0 || value > 99 ) return
        setInputValue(e.target.value)
    }

    const handleSendGifts = (e) => {
        e.preventDefault();
        if (clickFlag) {
            setClickFlag(false);
            sendGiftsMsg(selectGift, inputValue);
        }
        setTimeout(() => {
            setClickFlag(true);
        }, 300);
        onClose && onClose();

    }


    return (
        <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Box className={classes.root}>
                <Box className={classes.giftBox}>
                    <Box className={classes.giftStyle}>
                        <img src={gift_img ? require(`../../assets/gift/${gift_img}`) : heartIcon}
                            alt=""
                            className={classes.giftImg} />
                    </Box>
                    <Box className={classes.giftInfo}>
                        <Typography className={classes.giftNameStyle}>{gift_name}</Typography>
                        <Box className={classes.giftPriceBox}>
                            <img
                                className={classes.priceImg}
                                src={goldCoins ? require(`../../assets/gift/${goldCoins}`) : goldIcon}
                                alt=""
                            />
                            <Typography className={classes.priceText} >{gift_price}</Typography>
                        </Box>
                        <InputBase 
                            type="number"
                            placeholder={i18next.t('Number')}
                            value={inputValue}
                            className={classes.inputStyle} 
                            onChange={handleInputBaseValue}
                        />
                    </Box>
                </Box>
                <Box className={classes.privateBox}>
                    <Box className={classes.propertyBox}>
                        <img
                            className={classes.priceImg}
                            src={goldCoins ? require(`../../assets/gift/${goldCoins}`) : goldIcon}
                            alt=""
                        />
                        <Typography className={classes.priceText} >{i18next.t('Subtotal')}</Typography>
                        <Typography className={classes.priceText} >32</Typography>
                    </Box>
                    <Box className={classes.btnStyle}>
                        <Typography 
                            className={classes.sendTextStyle} 
                            onClick={handleSendGifts}>
                                {i18next.t('Send')}
                            </Typography>
                    </Box>
                </Box>
            </Box>
        </Popover>
    );
};

export default memo(SenfGifts);
