import axios from 'axios'

export const fetchBlog = (page) => {
    return axios.get(`http://localhost:3000/blog/index?page=${page}&perPage=4`)
}