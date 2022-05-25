import React, { useState, useEffect, memo } from 'react'
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from 'react-redux'
import i18next from "i18next";
import SendGifts from './sendGift'

const useStyles = makeStyles((theme) => {
	return {
		root: {
			width: "100%",
			borderRadius: "16px",
			border: "1px solid",
			marginTop: "3px"
		},
		textStyle: {
			height: "19px",
			fontFamily: "Roboto",
			fontSize: "16px",
			fontWeight: "600",
			lineHeight: "19px",
			letterSpacing: "0px",
			textAlign: "left",
			color: "#FFFFFF",
			paddingLeft: "10px"
		},
		giftBox: {
			display: "flex",
			alignItems: "center",
		},
		giftStyle: {
			marginLeft: "10px",
			background: "#333333",
			width: "68px",
			height: "72px",
			padding: "3px",
			borderRadius: "12px",
			textAlign: "center",
			cursor: "pointer",
			position: "relative"
		},
		giftImg: {
			width: "52px",
			height: "48px"
		},
		priceBox: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
		},
		priceImg: {
			width: "12px",
			height: "12px"
		},
		priceText: {
			fontFamily: "Roboto",
			fontSize: "12px",
			fontWeight: "600",
			lineHeight: "16px",
			letterSpacing: "0.15px",
			color: "#FFFFFF",
			marginLeft:"5px"
		},
		delayBox: {
			background: "linear-gradient(to right, #F87F16,#EE2EAC)",
			opacity:".8",
			position: "absolute",
			height: "100%",
			width: "100%",
			bottom: "0",
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
		},
		delayStyle: {
			height: "32px",
			width: "32px"
		},
		delayTextStyle: {
			fontFamily: "Roboto",
			fontSize: "28px",
			fontStyle: "italic",
			fontweight: "900",
			lineHeight: "32px",
			letterSpacing: "0.15000000596046448px",
			textAlign: "center",
			color: "#FFFFFF",
		}
	}
});
const Gift = () => {
	const classes = useStyles();
	const giftAry = useSelector(state => state?.giftAry) || [];
	const [selectGift, setSelectGift] = useState({})
	const [anchorEl, setAnchorEl] = useState(null)
	const [timeNum, setTimeNum] = useState(3)
	const handleGiftClick = (e, item) => {
		setAnchorEl(e.currentTarget);
		setSelectGift(item);
	}
	const handleCloseGift = () => {
		setAnchorEl(null)
	}

	const handleTimer = () => {
		let num = timeNum;
		let fa = setInterval(() => {
			if (num < 1) {
				clearInterval(fa)
				setTimeNum(3);
			} else {
				num--;
				setTimeNum(num);
			}
		}, 1000);
		return <Box className={classes.delayStyle}>
			<Typography className={classes.delayTextStyle}>{`${timeNum}s`}</Typography>
		</Box>
	}


	return (
		<Box className={classes.root}>
			<Typography className={classes.textStyle}>{i18next.t("Gifts")}</Typography>
			<Box className={classes.giftBox}>
				{
					giftAry.map((item, i) => {
						let { gift_img, goldCoins, gift_price, clickStatus } = item;
						return (
							<Box className={classes.giftStyle} key={i} onClick={(e) => handleGiftClick(e, item)}>
								<img
									className={classes.giftImg}
									src={require(`../../assets/gift/${gift_img}`) || ""}
									alt=""
								/>
								<Box className={classes.priceBox}>
									<img
										className={classes.priceImg}
										src={require(`../../assets/gift/${goldCoins}`) || ""}
										alt=""
									/>
									<Typography className={classes.priceText} >{gift_price}</Typography>
								</Box>
								{clickStatus && <Box className={classes.delayBox}>
									{handleTimer()}
								</Box>}
							</Box>
						)
					})
				}
			</Box>
			<SendGifts open={anchorEl} onClose={handleCloseGift} selectGift={selectGift}></SendGifts>
		</Box>
	)
}

export default memo(Gift);
