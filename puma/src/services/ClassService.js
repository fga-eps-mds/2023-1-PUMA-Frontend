/* eslint-disable*/

import axios from '../main.js';
import store from '../store';

export default class ClassService {
    async getClasses() {
        const auth = store.getters.token;
        const subjects = await axios.get(`${global.URL_GATEWAY}/class`, { headers: { auth } });
        return subjects;
    }

    async getClassById(classid) {
        const auth = store.getters.token;
        const subject = await axios.get(`${global.URL_GATEWAY}/class/${classid}`, { headers: { auth } });
        return subject;
    }

    updateClass(classid, classBody) {
        return new Promise((resolve, reject) => {
            const auth = store.getters.token;
            axios.put(`${global.URL_GATEWAY}/class/${classid}`, classBody, { headers: { auth } }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    deleteSubject(classId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${global.URL_GATEWAY}/class/${classId}`).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }
};
