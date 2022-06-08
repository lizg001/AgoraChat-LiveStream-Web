
import WebIM from '../utils/WebIM'
import store from '../redux/store'
import { userInfoAction, roomMemberInfoAction } from '../redux/actions'
import { genderObj } from '../componments/common/contants'

export const uploadAvatar = (couterRef) => {
    console.log('couterRef>>>', couterRef.current);
    let webimAuth = sessionStorage.getItem('webim_auth') || {}
    let { accessToken } = JSON.parse(webimAuth);
}


export const updateUserInfo = (avatarUrl, nickName, gender, Birthday) => {
    let options = {
        nickname: nickName,
        avatarurl: avatarUrl || '',
        gender: gender,
        birth: Birthday
    }
    WebIM.conn.updateOwnUserInfo(options).then((res) => {
        console.log('updateUserInfo>>>', res)
        store.dispatch(userInfoAction(res.data))
    })
}


export const getUserInfo = async (member) => {
    let count = 0;
    while (member.length > count) {
        let curmembers = member.slice(count, count + 100);
        await WebIM.conn.fetchUserInfoById(curmembers).then((res) => {
            store.dispatch(roomMemberInfoAction(res.data));
        });
        count += 100;
    }
};


