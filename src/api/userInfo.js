
import WebIM from '../utils/WebIM'
import store from '../redux/store'
import { userInfoAction } from '../redux/actions'


export const updateUserInfo = () => {
    let defaultAvatarUrl = "https://download-sdk.oss-cn-beijing.aliyuncs.com/downloads/IMDemo/avatar/Image1.png"
    let options = {
        nickname: '',
        avatarurl: defaultAvatarUrl,
        gender: 1,
        birth: '2000-01-01'
    }
    WebIM.conn.updateOwnUserInfo(options).then((res) => {
        console.log('updateUserInfo>>>',res)
        store.dispatch(userInfoAction(res.data))
    })
}