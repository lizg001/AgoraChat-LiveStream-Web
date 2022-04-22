import WebIM from '../utils/WebIM'
import store from '../redux/store'
import { giftMsgAction } from '../redux/actions'

export const sendGiftsMsg = (giftImg, name, inputValue, onClose) => {
    let currentUser = WebIM.conn.context.userId;
    let roomId = store.getState().roomInfo?.id
    var id = WebIM.conn.getUniqueId();         
    var msg = new WebIM.message('custom', id);   
    var customEvent = "customEvent";            
    var customExts = {
        name,
        inputValue,
        giftImg: `../assets/gift/${giftImg}`
    };                        
    msg.set({
        to: roomId,                        
        customEvent,
        customExts,
        form: currentUser,
        ext: {},                                 
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