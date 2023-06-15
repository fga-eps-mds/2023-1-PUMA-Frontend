/* eslint-disable*/

import axios from '../main.js';
import store from '../store';

export default class PartnerProjectService {
  getProjects() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/partnerProject`).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

  getProject(id) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/partnerProject/${id}`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

  deleteProject(id) {
    const auth = store.getters.token;
    console.log("teste service")
    return new Promise((resolve, reject) => {
      axios.delete(`${global.URL_GATEWAY}/partnerProject/${id}`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

  updateProject(id, data) {
    const auth = store.getters.token;
    console.log("teste service")
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/partnerProject/${id}`, data, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

  addProject(project) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/partnerProject`, project, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        console.log(error)
        reject(error);
      });
    });
  }

}
