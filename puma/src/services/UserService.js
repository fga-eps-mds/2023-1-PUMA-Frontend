/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable class-methods-use-this */
/* eslint-disable prefer-promise-reject-errors */
import axios from '@/main.js';

export default class UserService {
  registerUser(newUser) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/user/register`, newUser).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/register reject: ${response}`);
      });
    });
  }

  logUserIn(newUser) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/user/login`, newUser).then((response) => {
        if (response.data.auth) {
          resolve(response);
        } else {
          reject(`/login reject: ${response}`);
        }
      }).catch((response) => {
        reject(`/login reject: ${response}`);
      });
    });
  }

  sendEmail(email, callback) {
    return axios({
      method: 'post',
      url: `${global.URL_GATEWAY}/user/recover`,
      data: {
        email,
      },
    }).then((res) => {
      callback(res);
    }).catch((error) => {
      callback(error.response);
    });
  }

  updatePassword(email, password, callback) {
    return axios({
      method: 'put',
      url: `${global.URL_GATEWAY}/user/password/${email}`,
      data: {
        password,
      },
    }).then((res) => {
      callback(res);
    }).catch((error) => {
      callback(error.response);
    });
  }

  getUserType(userTypeId) {
    return new Promise((resolve, reject) => {
      const isUndefUserTypeId = userTypeId || '';
      axios.get(`${global.URL_GATEWAY}/user/userType/${isUndefUserTypeId}`).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/userType reject: ${response}`);
      });
    });
  }

  addUserType(newUserType) {
    return new Promise((resolve, reject) => {
      axios.post(`${global.URL_GATEWAY}/user/userType`, newUserType).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/userType reject: ${response}`);
      });
    });
  }

  updateUserType(newUserType, callback) {
    return axios({
      method: 'put',
      url: `${global.URL_GATEWAY}/user/userType/${newUserType.userTypeId}`,
      data: {
        newUserType,
      },
    }).then((res) => {
      callback(res);
    }).catch((error) => {
      callback(error.response);
    });
  }

  deleteUserType(userTypeId) {
    return new Promise((resolve, reject) => {
      axios.delete(`${global.URL_GATEWAY}/user/userType/${userTypeId}`).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/userType reject: ${response}`);
      });
    });
  }
}
