/* eslint-disable*/

import axios from '../main.js';

export default class BannerService {
    async getBanners() {
        const banners = await axios.get(`${global.URL_GATEWAY}/banner`);
        return banners;
    }

    getBannerById(id) {
      return new Promise((resolve, reject) => {
          axios.get(`${global.URL_GATEWAY}/banner/${id}`).then((response) => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          });
      });
    }

    addBanner(banner) {
        return new Promise((resolve, reject) => {
            axios.post(`${global.URL_GATEWAY}/banner`, banner).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    deleteBanner(id) {
        return new Promise((resolve, reject) => {
            axios.delete(`${global.URL_GATEWAY}/banner/${id}`).then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    // updateContact(id, contact) {
    //     return new Promise((resolve, reject) => {
    //         axios.put(`${global.URL_GATEWAY}/contact/update/${id}`, contact).then((response) => {
    //             resolve(response);
    //         }).catch((error) => {
    //             reject(error);
    //         });
    //     })
    // }
}