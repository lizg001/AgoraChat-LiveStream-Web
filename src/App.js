import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import initListen from './utils/WebIMListen'
import { openIM } from './api/layout'
import Box from '@mui/material/Box';
import Header from './componments/header'
import VideoPlayer from './componments/videoPleyer'
import { EaseLivestream } from 'chat-uikit-live';
import Gift from './componments/gift'
import RoomInfo from './componments/roomInfo'
import RoomList from './componments/roomList'
import Footer from './componments/footer'
import { makeStyles } from "@material-ui/core/styles";
import store from './redux/store'
import { miniRoomInfoAction } from './redux/actions'
import unionIcon from './assets/images/union.png'
const useStyles = makeStyles((theme) => {
	return {
		root: {
			backgroundColor: "#292929",
			overflow: "hidden"
		},
		iconBox: {
			height: "44px",
			width: "44px",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background:" #3D3D3D",
			cursor:"pointer",
			borderRadius:"12px"
		},
		iconStyle: {

		}
	}
});
const App = () => {
	const classes = useStyles();
	const roomMemberInfo = useSelector(state => state?.roomMemberInfo) || {};

	useEffect(() => {
		initListen()
		openIM()
	}, [])
	const isMini = useSelector(state => state?.isMini);
	const openRoomInfo = () => {
		store.dispatch(miniRoomInfoAction(false));
	}
	return (
		<Box className={classes.root}>
			<Header />
			<Box style={{ display: "flex", justifyContent: "space-between", padding: "5px 10px" }}>
				<Box style={{ width: "100%", marginRight: "10px" }}>
					<Box style={{ display: "flex", width: "100%", }}>
						<VideoPlayer />
						<Box style={{ height: "410px", width: "100%", border: "1px soild", borderRadius: "12px" }}>
							<EaseLivestream roomUserInfo={roomMemberInfo}/>
						</Box>
					</Box>
					<Gift />
				</Box>
				{isMini ? <Box onClick={() => openRoomInfo()} className={classes.iconBox}>
					<img src={unionIcon} alt="" /></Box> : <RoomInfo />}
			</Box>
			<RoomList />
			<Footer />
		</Box>
	);
}

export default App;
