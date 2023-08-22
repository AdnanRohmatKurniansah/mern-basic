import axios from 'axios'

export const fetchBlog = async (page) => {
    try {
        const response = await axios.get(`http://localhost:3000/blog/index?page=${page}`)
        return response
    } catch (error) {
        return error
    }
}

export const register = async (formData) => {
    try {
        const response = await axios.post(`http://localhost:3000/auth/register`, formData)
        return response
    } catch (error) {
        return error
    }
}

export const login = async (formData) => {
    try {
        const response = await axios.post(`http://localhost:3000/auth/login`, formData)
        return response
    } catch (error) {
        return error
    }
}

export const show = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3000/blog/${id}`)
        return response
    } catch (error) {
        return error
    }
}

export const createBlog = async (formData) => {
    try {
        const response = await axios.post('http://localhost:3000/blog/create', formData)
        return response
    } catch (error) {
        return error
    }
}

export const editBlog = async (id, formData) => {
    try {
        const response = await axios.put(`http://localhost:3000/blog/edit/${id}`, formData)
        return response
    } catch (error) {
        return error
    }
}

export const deleteBlog = async (id) => {
    try {
        const response = await axios.delete(`http://localhost:3000/blog/${id}`)
        return response
    } catch (error) {
        return error
    }
}