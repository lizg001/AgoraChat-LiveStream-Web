import WebIM from "./WebIM";
import i18next from "i18next";
import { updateUserInfo } from '../api/userInfo'
import { getLiverooms } from '../api/liveCdn'
import store from '../redux/store'
import { giftMsgAction } from '../redux/actions'
const initListen = () => {
	WebIM.conn.listen({
		onOpened: () => {
			console.log('login succes>>>');
			updateUserInfo();
			getLiverooms();
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

		onCustomMessage: (msg) => {
			store.dispatch(giftMsgAction(msg))
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
