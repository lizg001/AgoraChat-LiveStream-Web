import WebIM from '../utils/WebIM'
const layoutApi = {
    openIM: () => {
        let options = {
            user: 'lizg2',
            pwd: '1',
            appKey: WebIM.config.appkey
        };
        WebIM.conn.open(options).then((res)=>{
            console.log('loginIM success>>>',res);
        }).catch((err)=>{
            console.log('loginIM fail>>>', err);
        });
    },
    closeIM: () => {
        WebIM.conn.close()
    }
}

export default layoutApi;