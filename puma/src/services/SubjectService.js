/* eslint-disable*/

import axios from '../main.js';
import store from '../store';

export default class SubjectService {
    addSubject(subject) {
        return new Promise((resolve, reject) => {
            const auth = store.getters.token;
            axios.post(`${global.URL_GATEWAY}/subject`, subject, { headers: { auth } }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    async getSubjects() {
        const auth = store.getters.token;
        const subjects = await axios.get(`${global.URL_GATEWAY}/subject`, { headers: { auth } });
        return subjects;
    }

    async getSubjectById(subjectid) {
        const auth = store.getters.token;
        const subject = await axios.get(`${global.URL_GATEWAY}/subject/${subjectid}`, { headers: { auth } });
        return subject;
    }

    updateSubject(subjectid, subjectBody) {
        return new Promise((resolve, reject) => {
            const auth = store.getters.token;
            axios.put(`${global.URL_GATEWAY}/subject/${subjectid}`, subjectBody, { headers: { auth } }).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    deleteSubject(subjectId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${global.URL_GATEWAY}/subject/${subjectId}`).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getKnowledgeAreas() {
        return new Promise((resolve, reject) => {
            axios.get(`${global.URL_GATEWAY}/subject/knowledgeareas`).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getSubareas() {
        return new Promise((resolve, reject) => {
            axios.get(`${global.URL_GATEWAY}/subject/subareas`).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getAvailableKeywordsToSubject() {
        return new Promise((resolve, reject) => {
            axios.get(`${global.URL_GATEWAY}/subject/keywords`).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    getProfessors() {
        return new Promise((resolve, reject) => {
            axios.get(`${global.URL_GATEWAY}/subject/professors`).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        })
    }
};
