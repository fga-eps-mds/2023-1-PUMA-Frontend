/* eslint-disable*/

import axios from '../main.js';
import store from '../store';

export default class ProjectService {
  async getMyProposals(user) {
    const auth = store.getters.token;
    const myProposals = await axios.get(`${global.URL_GATEWAY}/project/myProposals`, {
      headers: {
        auth,
      },
      params: user,
    });
    return myProposals;
  }

  getProject(projectId) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/project/${projectId}`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  addProject(project) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/project`, project, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  updateProject(payload) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/project`, payload, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  deleteProject(projectId) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.delete(`${global.URL_GATEWAY}/project/${projectId}`, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  evaluateProject(payload) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/project/evaluate`, payload, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  reallocateProject(payload) {
    const auth = store.getters.token;
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/project/reallocate`, payload, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getAvailableKeywordsToProject() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/project/keywords`).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
