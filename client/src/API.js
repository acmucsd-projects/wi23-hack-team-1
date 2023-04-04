import axios from 'axios';

const serverURL = 'http://localhost:5000'

const API = {
    getUsers: function() {
        return axios.get(`${serverURL}/users/`);
    },
    getUser: function(id) {
        return axios.get(`${serverURL}/users/${id}`);
    },
    createUser: function (payload) {
        return axios.post(`${serverURL}/users/`, payload);
    },
    getPost: function (id) {
        return axios.get(`${serverURL}/posts/${id}`);
    },
    getPosts: function () {
        return axios.get(`${serverURL}/posts/`);
    },
    createPost: function (payload) {
        return axios.post(`${serverURL}/posts/`, payload);
    },
    getRestaurant: function (id) {
        return axios.get(`${serverURL}/restaurants/${id}`);
    },
    getRestaurants: function () {
        return axios.get(`${serverURL}/restaurants/`);
    },
    createRestaurant: function (payload) {
        return axios.post(`${serverURL}/restaurants/`, payload);
    },
}

export default API;