import axios from 'axios';

const serverURL = 'http://localhost:4000'

const API = {
    getUsers: function() {
        return axios.get(`${serverURL}/users/`);
    },
    getUser: function() {
        return axios.get(`${serverURL}/users/:id`);
    },
    createUser: function (payload) {
        return axios.post(`${serverURL}/users/`, payload);
    },
    getPosts: function () {
        return axios.get(`${serverURL}/posts/`);
    },
    createPost: function (payload) {
        return axios.post(`${serverURL}/posts/`, payload);
    },
    getRestaurants: function () {
        return axios.get(`${serverURL}/restaurants/`);
    },
    createRestaurant: function (payload) {
        return axios.post(`${serverURL}/restaurants/`, payload);
    },
}

export default API;