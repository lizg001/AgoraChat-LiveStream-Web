import React, { useEffect } from 'react'
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
import './App.css';


function App() {
	useEffect(() => {
		initListen()
		openIM()
	}, [])

	return (
		<Box className="App">
			<Header />
			<Box style={{ display: "flex", justifyContent: "space-between",padding:"5px 10px" }}>
				<Box style={{ width: "100%", marginRight: "10px"}}>
					<Box style={{ display: "flex", width: "100%" }}>
						<VideoPlayer />
						<Box style={{ height: "420px", width: "100%" }}>
							<EaseLivestream />
						</Box>
					</Box>
					<Gift />
				</Box>
				<RoomInfo />
			</Box>
			<RoomList />
			<Footer />
		</Box>
	);
}

export default App;
