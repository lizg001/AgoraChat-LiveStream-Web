import WebIM from '../utils/WebIM'
import store from '../redux/store'
import { roomsAction } from '../redux/actions'
const roomApi = {
    getJoinedRoom: () => {
        let option = {
            pagenum: 1,                                 // 页数
            pagesize: 20                                // 每页个数
        };
        WebIM.conn.getChatRooms(option).then((res) => {
            console.log(res);
            store.dispatch(roomsAction(res.data))
        })
    },
    joinRoom: (roomId, addSessionItem) => {
        let options = {
            roomId,   
            message: 'reason'   
        }
        WebIM.conn.joinChatRoom(options).then((res) => {
            console.log(res)
            addSessionItem && addSessionItem(roomId)
        })
    }
}

export default roomApi;