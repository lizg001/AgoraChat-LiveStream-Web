
export const userInfoAction = (data) => {
    return { type: 'USER_INFO_ACTION', data };
}

export const roomsAction = (data) => {
    return { type: 'ROOMS_ACTION', data };
};

export const roomInfoAction = (data) => {
    return { type: 'ROOM_INFO_ACTION', data };
};

export const roomAllowedAction = (data) => {
    return { type: 'ROOM_ALLOWED_ACTION', data };
};