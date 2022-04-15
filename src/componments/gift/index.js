import React, { memo } from 'react'
import { GiftsAry } from './renderGifts'
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import i18next from "i18next";

const useStyles = makeStyles((theme) => {
	return {
		root: {
			width: "100%",
			borderRadius: "16px",
			border: "1px solid",
			padding:"3px 0"
		},
		textStyle: {
			height:"19px",
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
			borderRadius:"12px"
		},
		giftImg: {
			width: "52px",
			height: "48px"
		},
		priceBox: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center"
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
			color: "#FFFFFF"
		}
	}
});
const Gift = () => {
	const classes = useStyles();
	return (
		<Box className={classes.root}>
			<Typography className={classes.textStyle}>{i18next.t("Gifts")}</Typography>
			<Box className={classes.giftBox}>
				{
					(GiftsAry.map).map((item, i) => {
						let { giftImg, goldCoins, price } = item;
						return (
							<Box className={classes.giftStyle} key={i}>
								<img
									className={classes.giftImg}
									src={require(`../../assets/gift/${giftImg}`)}
									alt=""
								/>
								<Box className={classes.priceBox}>
									<img
										className={classes.priceImg}
										src={require(`../../assets/gift/${goldCoins}`)}
										alt=""
									/>
									<Typography className={classes.priceText} >{price}</Typography>
								</Box>
							</Box>
						)

					})
				}
			</Box>
		</Box>
	)
}

export default memo(Gift);
