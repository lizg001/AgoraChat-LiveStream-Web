
let defaultState = {
    rooms:[],
    roomInfo:{},
    roomAllowed:[]
};

const reducer = (state = defaultState, action) => {
    const { type, data, option } = action;
    switch (type) {
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
        default:
            break;
    }
}

export default reducer;
