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

  updatePassword(token, password, callback) {
    return axios({
      method: 'put',
      url: `${global.URL_GATEWAY}/user/password/${token}`,
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

  updateIdealizer(userId, obj) {
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/user/${userId}`, obj).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/user reject: ${response}`);
      });
    });
  }

  updateUserType(newUserType) {
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/user/userType/${newUserType.userTypeId}`, newUserType).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`/user/userType/:userTypeId update reject: ${response}`);
      });
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

  getPendingTeachers() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/user/teacher/pending`).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`user/teacher/pending reject: ${response}`);
      });
    });
  }

  updateStatusTeacher(userId, accept) {
    return new Promise((resolve, reject) => {
      axios.patch(`${global.URL_GATEWAY}/user/teacher/pending/${userId}`, { accept }).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`user/teacher/pending reject: ${response}`);
      });
    });
  }

  getAllUsers() {
    return new Promise((resolve, reject) => {
      axios.get(`${global.URL_GATEWAY}/user/all`).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`user/all reject: ${response}`);
      });
    });
  }

  revokeUserPermissions(userId) {
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/user/revoke/${userId}`).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`user/revoke/${userId} reject: ${response}`);
      });
    });
  }

  changeUserTypes(users) {
    return new Promise((resolve, reject) => {
      axios.put(`${global.URL_GATEWAY}/user/userTypes/change`, users).then((response) => {
        resolve(response);
      }).catch((response) => {
        reject(`userTypes/change reject: ${response}`);
      });
    });
  }
}
