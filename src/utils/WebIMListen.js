import WebIM from "./WebIM";
import i18next from "i18next";
import { updateUserInfo } from '../api/userInfo'
import { getJoinedRoom } from '../api/room'
const initListen = () => {
	WebIM.conn.listen({
		onOpened: () => {
			console.log('login succes>>>');
			updateUserInfo();
			getJoinedRoom();
		},
		onClosed: () => {
		},
		onError: (err) => {
			console.log("onError>>>", err);
		},
		onPresence: (event) => {
			console.log("onPresence>>>", event);
		},
		onContactInvited: (msg) => {
			console.log("onContactInvited", msg);
		},

		onTokenWillExpire: () => {
			
		},
	});

	WebIM.conn.addEventHandler("REQUESTS", {
		onContactInvited: (msg) => {
			console.log("onContactInvited", msg);	
		},
		onGroupChange: (msg) => {
			console.log("onGroupChange", msg);
		},
	});

	WebIM.conn.addEventHandler("TOKENSTATUS", {
		onTokenWillExpire: (token) => {
		},
		onTokenExpired: () => {
			console.error("onTokenExpired");
		},
		onConnected: () => {
			console.log("onConnected");
		},
		onDisconnected: () => {
			console.log("onDisconnected");
		},
	});
};

export default initListen;
