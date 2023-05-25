/* eslint-disable*/

import axios from '../main.js';

export default class ContactService {
    async getContacts() {
        const contacts = await axios.get(`${global.URL_GATEWAY}/contact`);
        return contacts;
    }

    addContact(contact) {
        return new Promise((resolve, reject) => {
            axios.post(`${global.URL_GATEWAY}/contact/create`, contact).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}