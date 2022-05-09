
let defaultState = {
    userInfo: {},
    rooms: [],
    roomInfo: {},
    roomMemberInfo: {},
    roomAdmins: [],
    roomAllowed: [],
    roomMuted: [],
    roomBans: [],
    isMini: false,
    giftMsgs: [],
    liveCdnUrl: ""
};

const reducer = (state = defaultState, action) => {
    const { type, data } = action;
    switch (type) {
        case "USER_INFO_ACTION":
            return {
                ...state,
                userInfo: data
            };
        case "ROOMS_ACTION":
            return {
                ...state,
                rooms: data
            };
        case "ROOM_INFO_ACTION":
            return {
                ...state,
                roomInfo: data
            };
        case "ROOM_MEMBER_INFO_ACTION":
            return {
                ...state,
                roomMemberInfo: data
            };
        case "ROOM_ADMMINS_ACTION":
            return {
                ...state,
                roomAdmins: data
            };
        case "ROOM_ALLOWED_ACTION":
            return {
                ...state,
                roomAllowed: data
            };
        case "ROOM_MUTED_ACTION":
            return {
                ...state,
                roomMuted: data
            };
        case "ROOM_BAN_ACTION":
            return {
                ...state,
                roomBans: state.roomBans.concat(data)
            };
        case "MINI_ROOM_INFO_ACTION":
            return {
                ...state,
                isMini: data
            };
        case "GIFT_MSG_ACTION":
            let giftMsgsAry = state.giftMsgs.concat(data)
            return {
                ...state,
                giftMsgs: giftMsgsAry
            };
        case "CLEAR_GIFT_MSG_ACTION":
            let newGiftMsgs = state.giftMsgs.filter(item => item.id === data)
            return {
                ...state,
                giftMsgs: newGiftMsgs
            };
        case "GET_LIVE_CDN_URL_ACTION":
            return {
                ...state,
                liveCdnUrl: data
            };
        default:
            break;
    }
}

export default reducer;

