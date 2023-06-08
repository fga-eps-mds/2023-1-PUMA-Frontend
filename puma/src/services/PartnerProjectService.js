/* eslint-disable*/

import axios from '../main.js';
import store from '../store';

export default class PartnerProjectService {
  // getProject(projectId) {
  //   const auth = store.getters.token;
  //   return new Promise((resolve, reject) => {
  //     axios.get(`${global.URL_GATEWAY}/project/${projectId}`, { headers: { auth } }).then((response) => {
  //       resolve(response);
  //     }).catch((error) => {
  //       reject(error);
  //     });
  //   });
  // }

  addProject(project) {
    const auth = store.getters.token;
    console.log("teste")
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
