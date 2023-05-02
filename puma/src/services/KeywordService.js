/* eslint-disable*/

import axios from '../main.js';
import store from '../store';
import dotenv from 'dotenv';


export default class KeywordService {
  addKeyword(keyword) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.post(`${process.env.URL_GATEWAY}/keyword`, { keyword: keyword }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  getKeywords() {
    return new Promise((resolve, reject) => {
      axios.get(`${process.env.URL_GATEWAY}/keyword`).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  updateKeyword(keywordid, newKeyword) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.put(`${process.env.URL_GATEWAY}/keyword`, { keywordid: keywordid, newKeyword: newKeyword }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  deleteKeyword(keywordid) {
    return new Promise((resolve, reject) => {
      axios.delete(`${process.env.URL_GATEWAY}/keyword/${keywordid}`).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  addKeywordToSubject(keywordid, subjectid) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.post(`${process.env.URL_GATEWAY}/keyword/subject`, { keywordid: keywordid, subjectid: subjectid }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  updateSubjectKeyword(keywordid, subjectid) {
    return new Promise((resolve, reject) => {
      const auth = store.getters.token;
      axios.put(`${process.env.URL_GATEWAY}/keyword/subject`, { keywordid: keywordid, subjectid: subjectid }, { headers: { auth } }).then((response) => {
        resolve(response);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}
