/* eslint-disable*/

import axios from '../main.js';
import store from '../store';

export default class PumaInfoService {
    updatePuma_Info(pumaItem) {
        return new Promise((resolve, reject) => {
            const auth = store.getters.token;
            axios.put(`${global.URL_GATEWAY}/pumaInfo`, pumaItem, { headers: { auth } }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    async getPuma_Infos() {
        const auth = store.getters.token;
        const Pumainfos = await axios.get(`${global.URL_GATEWAY}/pumaInfo`, { headers: { auth } });
        return Pumainfos;
    }
};
