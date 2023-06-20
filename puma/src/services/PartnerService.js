/* eslint-disable*/

import axios from '../main.js';
import store from '../store';

export default class PartnerProjectService {
  getPartners() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/partners`).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

  getPartner(partnerId) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/partners/${partnerId}`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

  deletePartners(partnerId) {
    const auth = store.getters.token;
    console.log("teste service")
    return new Promise((resolve, reject) => {
      axios.delete(`${global.URL_GATEWAY}/partner/${partnerId}`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

  updatePartners(partnerId, data) {
    const auth = store.getters.token;
    console.log("teste service")
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/partners/${partnerId}`, data, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

  addPartners(project) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/partners`, partner, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

}
