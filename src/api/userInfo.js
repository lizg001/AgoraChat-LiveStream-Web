
import WebIM from '../utils/WebIM'
import store from '../redux/store'
import { userInfoAction } from '../redux/actions'
import { defaultAvatarUrl } from '../componments/common/contants'


export const updateUserInfo = (avatarUrl,nickName,gender) => {
    let options = {
        nickname: nickName,
        avatarurl: avatarUrl || defaultAvatarUrl,
        gender: gender,
        birth: '2000-01-01'
    }
    WebIM.conn.updateOwnUserInfo(options).then((res) => {
        console.log('updateUserInfo>>>',res)
        store.dispatch(userInfoAction(res.data))
    })
}