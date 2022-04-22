import WebIM from '../utils/WebIM'
import store from '../redux/store'
import { roomInfoAction, roomAdminsAction, roomAllowedAction, roomMutedAction, roomBanAction } from '../redux/actions'


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
        getRoomAdmins(roomId)
    })
};

export const getRoomAdmins = (roomId) => {
    let currentLoginUser = WebIM.conn.context.userId;
    let options = {
        chatRoomId: roomId
    }
    WebIM.conn.getChatRoomAdmin(options).then((res) => {
        console.log('getRoomAdmins>>>',res);
        store.dispatch(roomAdminsAction(res.data));
        if ((res.data.includes(currentLoginUser))) {
            getRoomWriteList(roomId);
            getRoomMuteList(roomId);
            getRoomBlockList(roomId)
        }
    })
}

export const getRoomWriteList = (roomId) => {
    let options = {
        groupId: roomId
    }
    WebIM.conn.getGroupWhitelist(options).then((res) => {
        console.log("getGroupWhitelist>>>", res);
        store.dispatch(roomAllowedAction(res.data))
    })
}

export const addRoomWhiteUser = (roomId, userName, onClose) => {
    let options = {
        groupId: roomId,
        users: [userName]
    };
    WebIM.conn.addUsersToGroupWhitelist(options).then((res) => {
        getRoomWriteList(roomId);
        onClose && onClose();
    })
}

export const rmRoomWhiteUser = (roomId, userName, onClose) => {
    let options = {
        chatRoomId: roomId,
        userName: userName
    };
    WebIM.conn.rmUsersFromGroupWhitelist(options).then((res) => {
        getRoomWriteList(roomId);
        onClose && onClose();
    })
}

export const getRoomMuteList = (roomId) => {
    let options = {
        chatRoomId: roomId
    };
    WebIM.conn.getChatRoomMuted(options).then((res) => {
        console.log('getRoomMuteList>>>',res)
        store.dispatch(roomMutedAction(res.data))
    })
}

export const addRoomMuted = (roomId, userName, onClose) => {
    let options = {
        username: userName,
        muteDuration: 886400000,
        chatRoomId: roomId
    };
    WebIM.conn.muteChatRoomMember(options).then((res) => {
        console.log('make mute success>>>', res)
        getRoomMuteList(roomId);
        onClose && onClose();
    })
}

export const rmRoomMuted = (roomId, userName, onClose) => {
    let options = {
        username: userName,
        muteDuration: 886400000,
        chatRoomId: roomId
    };
    WebIM.conn.removeMuteChatRoomMember(options).then((res) => {
        console.log('move mute success>>>', res)
        getRoomMuteList(roomId);
        onClose && onClose();
    })
}


export const getRoomBlockList = (roomId) => {
    let option = {
        chatRoomId: roomId
    };
    WebIM.conn.getChatRoomBlacklistNew(option).then((res) => {
        console.log('getGroupBlockList>>>',res);
        store.dispatch(roomBanAction(res.data));
    })
}

export const addRoomBlock = (roomId,username,onClose) => {
    let options = {
        chatRoomId: roomId,
        username: username
    };
    WebIM.conn.chatRoomBlockSingle(options).then((res) => {
        console.log('groupBlockSingle>>>', res);
        getRoomBlockList(roomId)
        onClose && onClose();
    })
}

export const rmRoomBlock = (roomId, username, onClose) => {
    let options = {
        chatRoomId: roomId,
        username: username
    };
    WebIM.conn.removeChatRoomBlockSingle(options).then((res) => {
        console.log('removeGroupBlockSingle>>>', res);
        getRoomBlockList(roomId)
        onClose && onClose();
    })
}