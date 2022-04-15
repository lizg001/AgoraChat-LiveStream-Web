import WebIM from '../utils/WebIM'
import store from '../redux/store'
import { roomsAction, roomInfoAction } from '../redux/actions'

export const getJoinedRoom = () => {
    let option = {
        pagenum: 1,                                 // 页数
        pagesize: 20                                // 每页个数
    };
    WebIM.conn.getChatRooms(option).then((res) => {
        console.log('JoinedRoom>>>', res);
        store.dispatch(roomsAction(res.data));
    })
};

export const joinRoom = (roomId, addSessionItem) => {
    let options = {
        roomId,
        message: 'reason'
    }
    WebIM.conn.joinChatRoom(options).then((res) => {
        console.log('joinRoom>>>', res);
        addSessionItem && addSessionItem(roomId);
        getRoomInfo(roomId);
    })
};

export const getRoomInfo = (roomId) => {
    let options = {
        chatRoomId: roomId
    }
    WebIM.conn.getChatRoomDetails(options).then((res) => {
        store.dispatch(roomInfoAction(res.data[0]));
        getRoomWhileList(roomId);
        getRoomMutedList(roomId);
    })
};

export const getRoomWhileList = (roomId) => {
    let options = {
        chatRoomId: roomId
    }
    WebIM.conn.getChatRoomWhitelist(options).then((res) => {
        console.log('Whitelist>>>', res);
    });
};

export const getRoomMutedList = (roomId) => {
    let options = {
        chatRoomId: roomId
    };
    WebIM.conn.getChatRoomMuted(options).then((res) => {
        console.log('RoomMuted>>>', res);
    })
};

