
let defaultState = {
    rooms:[]
};

const reducer = (state = defaultState, action) => {
    const { type, data, option } = action;
    switch (type) {
        case "ROOMS_ACTION":
            return {
                ...state,
                rooms: data
            }
        default:
            break;
    }
}

export default reducer;

