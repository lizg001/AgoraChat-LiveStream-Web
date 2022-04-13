import WebIM from '../utils/WebIM'
import store from '../redux/store'
import { roomsAction, roomInfoAction } from '../redux/actions'
const roomApi = {
    getJoinedRoom: () => {
        let option = {
            pagenum: 1,                                 // 页数
            pagesize: 20                                // 每页个数
        };
        WebIM.conn.getChatRooms(option).then((res) => {
            console.log('JoinedRoom>>>', res);
            store.dispatch(roomsAction(res.data));
        })
    },
    joinRoom: (roomId, addSessionItem) => {
        let options = {
            roomId,
            message: 'reason'
        }
        WebIM.conn.joinChatRoom(options).then((res) => {
            console.log('joinRoom>>>', res);
            addSessionItem && addSessionItem(roomId);
            getRoomInfo(roomId);
        })
    },
}

const getRoomInfo = (roomId) => {
    let options = {
        chatRoomId: roomId
    }
    WebIM.conn.getChatRoomDetails(options).then((res) => {
        store.dispatch(roomInfoAction(res.data[0]));
        getRoomWhileList(roomId);
        getRoomMutedList(roomId);
    })
}

const getRoomWhileList = (roomId) => {
    let options = {
        chatRoomId: roomId
    }
    WebIM.conn.getChatRoomWhitelist(options).then((res) => {
        console.log('Whitelist>>>', res);
    });
}

const getRoomMutedList = (roomId) => {
    let options = {
        chatRoomId: roomId
    };
    WebIM.conn.getChatRoomMuted(options).then((res) => {
        console.log('RoomMuted>>>',res);
    })
}

export default roomApi;