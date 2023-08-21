import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { fetchBlog } from '../../libs/api'
import { useNavigate } from 'react-router-dom'

export default function List() {
    const token = localStorage.getItem('token')
    const [blogs, setBlogs] = useState([])
    const navigate = useNavigate()

    useEffect((page) => {
        if (!token) {
            navigate('/login')
        }
        fetchBlog(page)
          .then((result) => {
            const response = result.data;
            setBlogs(response.data);
          })
          .catch((err) => {
            console.log(err);
        });
      }, [])

  return (
    <div>
        <Navbar />
        <div className="mx-10 md:container md:mx-auto mt-10">
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Body</th>
                        <th></th>
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
                                    <button className="btn btn-info btn-xs mr-2">Edit</button>
                                    <button className="btn btn-warning btn-xs">Hapus</button>
                                </th>
                            </tr>
                            ))
                        )
                    }
                    </tbody>
                </table>
            </div>
        </div>
        <Footer />
    </div>
  )
}
