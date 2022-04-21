
let defaultState = {
    userInfo: {},
    rooms:[],
    roomInfo:{},
    roomAllowed:[],
    isMini: false,
    giftMsgs:{},
    liveCdnUrl:""
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
                roomInfo:data
            };
        case "roomAllowedAction":
            return {
                ...state,
                roomAllowed: data
            };
        case "MINI_ROOM_INFO_ACTION":
            return {
                ...state,
                isMini: data
            };
        case "GIFT_MSG_ACTION":
            return {
                ...state,
                giftMsgs: data
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

