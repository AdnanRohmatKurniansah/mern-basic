import axios from 'axios'

export const fetchBlog = (page) => {
    return axios.get(`http://localhost:3000/blog/index?page=${page}&perPage=4`)
}

export const register = (formData) => {
    return axios.post(`http://localhost:3000/auth/register`, formData)
}

export const login = (formData) => {
    return axios.post(`http://localhost:3000/auth/login`, formData)
}