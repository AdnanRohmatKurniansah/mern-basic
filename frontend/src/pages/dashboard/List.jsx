import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { deleteBlog, fetchBlog } from '../../libs/api'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

export default function List() {
    const token = localStorage.getItem('token')
    const [blogs, setBlogs] = useState([])
    const [paginate, setPaginate] = useState({})
    const [counter, setCounter] = useState(1)
    const navigate = useNavigate()

    const toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    })  

    useEffect(() => {
        if (!token) {
            navigate('/login')
        } else {
            loadBlog(counter)
        }
    }, [counter])

    const loadBlog = async (page) => {
        axios.defaults.headers.common['Authorization'] = `${token}`
        
        const response = await fetchBlog(page)
        if (response.data) {
            setBlogs(response.data.data)
            setPaginate(response.data)
        } else {
            console.log(response.response.data.message)
        }
    }

    const previous = () => {
        setCounter(counter <= 1 ? 1 : counter - 1)
        console.log(counter)
    }
    
    const totalPage = Math.ceil(paginate.total_data / paginate.per_page)
    
    const next = () => {
        setCounter(counter === totalPage ? totalPage : counter + 1)
        console.log(counter)
    }

    const remove = async (id) => {
        const confirmed = window.confirm("Anda yakin ingin menghapus blog ini?");
    
        if (confirmed) {
            const response = await deleteBlog(id)
            if (response.data) {
                setBlogs((prevBlogs) => prevBlogs.filter(blog => blog._id !== id))
                toast.fire({    
                    icon: "success",
                    text: response.data.message
                });
            } else {
                toast.fire({
                    icon: 'error',
                    text: response.response.data.message
                });
            }
        }
    };

  return (
    <div>
        <Navbar />
        <div className="mx-10 md:container md:mx-auto mt-10">
            <div className="overflow-x-auto">
                <Link className='ml-5 btn btn-success btn-sm' to={'/blog/create'}>Create</Link>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        blogs.length > 0 && (
                            blogs.map((blog, i) => (
                                <tr key={i}>
                                <td>
                                <div className="flex items-center space-x-3">
                                    <div className="avatar">
                                        <div className=" w-20 h-20">
                                            <img src={`http://localhost:3000/${blog.image}`}  />
                                        </div>
                                    </div>
                                    <div>
                                    <div className="font-bold">{blog.title}</div>
                                    </div>
                                </div>
                                </td>
                                <td>{blog.body}</td>
                                <th>
                                    <Link to={`/blog/edit/${blog._id}`} className="btn btn-info btn-xs mr-2">Edit</Link>
                                    <button onClick={() => remove(blog._id)} className="btn btn-warning btn-xs">Hapus</button>
                                </th>
                            </tr>
                            ))
                        )
                    }
                    </tbody>
                </table>
            </div>
            <div className="join mt-12 container mx-auto justify-center">
                <button className="join-item btn" onClick={previous}>«</button>
                <button className="join-item btn">{paginate.current_page} - {totalPage}</button>
                <button className="join-item btn" onClick={next}>»</button>
            </div>
        </div>
        <Footer />
    </div>
  )
}
