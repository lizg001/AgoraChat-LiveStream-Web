
let defaultState = {
    userInfo: {},
    rooms:[],
    roomInfo:{},
    roomAllowed:[],
    isMini: false
};

const reducer = (state = defaultState, action) => {
    const { type, data, option } = action;
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
        default:
            break;
    }
}

export default reducer;

