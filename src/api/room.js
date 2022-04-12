import WebIM from '../utils/WebIM'
const roomApi = {
    getJoinedRoom: () => {
        let option = {
            pagenum: 1,                                 // 页数
            pagesize: 20                                // 每页个数
        };
        WebIM.conn.getChatRooms(option).then((res) => {
            console.log(res)
        })

    }
}

export default roomApi;