import store from '../redux/store'
import { roomsAction, getLiveCdnUrlAction } from '../redux/actions'

export const getLiverooms = () => {
    let webimAuth = sessionStorage.getItem('webim_auth') || {}
    let { accessToken } = JSON.parse(webimAuth);
    const apiURL = `http://a1.easemob.com/appserver/liverooms/ongoing`;
    let liveRooms = fetch(apiURL, {
        method: 'GET',
        headers: new Headers(
            {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        ),
    })
        .then(response => {
            return response.json().then(json => ({ json, response }));
        })
        .then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        });
    liveRooms
        .then(res => {
            console.log('res>>>', res);        
            store.dispatch(roomsAction(res.entities));
        })
    ["catch"](err => {
        console.log('err>>>', err);
    });
}

export const getLiveRoomInfo = (liveroomId) => {
    let webimAuth = sessionStorage.getItem('webim_auth') || {}
    let { accessToken } = JSON.parse(webimAuth);
    const apiURL = `http://a1.easemob.com/appserver/liverooms/${liveroomId}`;
    let liveRooms = fetch(apiURL, {
        method: 'GET',
        headers: new Headers(
            {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
        ),
    })
        .then(response => {
            return response.json().then(json => ({ json, response }));
        })
        .then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        });
    liveRooms
        .then(res => {
            console.log('getLiveRoomInfo>>>', res);
            // store.dispatch(roomsAction(res.entities));
        })
    ["catch"](err => {
        console.log('err>>>', err);
    });
}

export const getLiveCdnUrl = (roomId) => {
    const apiURL = `http://a1.easemob.com/appserver/agora/cdn/streams/url/play?protocol=hls&domain=ws-rtmp-pull.easemob.com&pushPoint=live&streamKey=${roomId}`;
    let liveRoomsUrl = fetch(apiURL, {
        method: 'GET',
        headers: new Headers(
            {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        ),
    })
        .then(response => {
            return response.json().then(json => ({ json, response }));
        })
        .then(({ json, response }) => {
            if (!response.ok) {
                return Promise.reject(json);
            }
            return json;
        });
    liveRoomsUrl
        .then(res => {
            console.log('res>>>', res);
            store.dispatch(getLiveCdnUrlAction(res.data))
        })
    ["catch"](err => {
        console.log('err>>>', err);
    });
}

