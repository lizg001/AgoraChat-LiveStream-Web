
export const userInfoAction = (data) => {
    return { type: 'USER_INFO_ACTION', data };
}

export const roomsAction = (data) => {
    return { type: 'ROOMS_ACTION', data };
};

export const roomInfoAction = (data) => {
    return { type: 'ROOM_INFO_ACTION', data };
};

export const roomAdminsAction = (data) => {
    return { type: 'ROOM_ADMMINS_ACTION', data };
};

export const roomAllowedAction = (data) => {
    return { type: 'ROOM_ALLOWED_ACTION', data };
};

export const roomMutedAction = (data) => {
    return { type: 'ROOM_MUTED_ACTION', data };
}

export const roomBanAction = (data) => {
    return { type: 'ROOM_BAN_ACTION', data };
}

export const miniRoomInfoAction = (data) => {
    return { type: 'MINI_ROOM_INFO_ACTION', data };
}

export const giftMsgAction = (data) => {
    return { type: 'GIFT_MSG_ACTION', data };
}

export const getLiveCdnUrlAction = (data) => {
    return { type: 'GET_LIVE_CDN_URL_ACTION', data };
}