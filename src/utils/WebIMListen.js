import WebIM from "./WebIM";
import i18next from "i18next";
import { updateUserInfo } from '../api/userInfo'
import { getLiverooms } from '../api/liveCdn'
import { getRoomInfo,getRoomAdmins, getRoomMuteList, getRoomWriteList, leaveRoom } from '../api/room'
import store from '../redux/store'
import { giftMsgAction, roomInfoAction, roomBanAction } from '../redux/actions'
import { isChatroomAdmin } from '../componments/common/contants'
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
			console.log('onCustomMessage>>>',msg);
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
		onChatroomChange: (event) => {
			console.log('onChatroomChange',event);
			let { type,gid,to } = event;
			switch (type) {
				case "memberJoinChatRoomSuccess":
					getRoomInfo(gid)
					break;
				case "addAdmin":
					getRoomAdmins(gid);
					break;
				case "removeAdmin":
					getRoomAdmins(gid);
					break;
				case "addMute":
					isChatroomAdmin(to) && getRoomMuteList(gid);
					break;     
				case "removeMute":
					isChatroomAdmin(to) && getRoomMuteList(gid);
					break;
				case "addUserToChatRoomWhiteList":
					isChatroomAdmin(to) && getRoomWriteList(gid);
					break;
				case "rmUserFromChatRoomWhiteList":
					isChatroomAdmin(to) && getRoomWriteList(gid);
					break;
				case "removedFromGroup":
					leaveRoom(gid);
					store.dispatch(roomBanAction(to))
					break;
				case "deleteGroupChat":
					leaveRoom(gid);
					break;
				default:
					break;
			}
		}
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
