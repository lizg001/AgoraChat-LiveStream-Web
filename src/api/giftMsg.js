import WebIM from '../utils/WebIM'
import store from '../redux/store'
import { giftMsgAction } from '../redux/actions'

export const sendGiftsMsg = (giftImg, name, inputValue, onClose) => {
    let currentUser = WebIM.conn.context.userId;
    let roomId = store.getState().roomInfo?.id
    var id = WebIM.conn.getUniqueId();                 // 生成本地消息id
    var msg = new WebIM.message('custom', id);   // 创建自定义消息
    var customEvent = "customEvent";             // 创建自定义事件
    var customExts = {
        name,
        inputValue,
        giftImg: `../assets/gift/${giftImg}`
    };                         // 消息内容，key/value 需要 string 类型
    msg.set({
        to: roomId,                          // 接收消息对象（用户id）
        customEvent,
        customExts,
        form: currentUser,
        ext: {},                                  // 消息扩展
        chatType: 'chatRoom',               
        success: function (id, serverMsgId) {
            console.log('id,serverMsgId', id, serverMsgId);
            msg.body.id = serverMsgId;
            console.log('msg.body', msg.body);
            store.dispatch(giftMsgAction(msg.body))
            onClose && onClose();
        },
        fail: function (e) { }
    });
    WebIM.conn.send(msg.body);
}