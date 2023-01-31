/* eslint-disable*/

import axios from '../main.js';
import store from '../store';

export default class KeywordService {
  addKeyword(keyword) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.post(`https://puma20221-api-gateway.herokuapp.com/keyword`, { keyword: keyword }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getKeywords() {
    return new Promise((resolve, reject) => {
      axios.get(`https://puma20221-api-gateway.herokuapp.com/keyword`).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  updateKeyword(keywordid, newKeyword) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.put(`https://puma20221-api-gateway.herokuapp.com/keyword`, { keywordid: keywordid, newKeyword: newKeyword }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  deleteKeyword(keywordid) {
    return new Promise((resolve, reject) => {
      axios.delete(`https://puma20221-api-gateway.herokuapp.com/keyword/${keywordid}`).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  addKeywordToSubject(keywordid, subjectid) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.post(`https://puma20221-api-gateway.herokuapp.com/keyword/subject`, { keywordid: keywordid, subjectid: subjectid }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  updateSubjectKeyword(keywordid, subjectid) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.put(`https://puma20221-api-gateway.herokuapp.com/keyword/subject`, { keywordid: keywordid, subjectid: subjectid }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
