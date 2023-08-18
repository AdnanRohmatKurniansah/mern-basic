import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [paginate, setPaginate] = useState({})
  const [counter, setCounter] = useState(1)
 
  const navigate = useNavigate()

  useEffect((page) => {
    axios.get(`http://localhost:3000/blog/index?page=${page}&perPage=8`)
    .then((result) => {
      const response = result.data
      setBlogs(response.data)
      setPaginate(response)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const previous = () => {
    setCounter(counter <= 1 ? 1 : counter - 1)
    console.log(counter)
  }

  const totalPage = Math.ceil(paginate.total_data / paginate.per_page)

  const next = () => {
    setCounter(counter === totalPage ? totalPage : counter + 1)
    console.log(counter)
  }

  return (
    <div>
        <Navbar />
        <div className="mx-10 md:container md:mx-auto mt-10 md:grid md:grid-cols-4 gap-4">
          {
          blogs.length > 0 && (
            blogs.map((blog, i) => (
              <div className="card bg-base-100 shadow-xl" key={i}>
              <figure className="px-10 pt-10">
                <img src={`http://localhost:3000/${blog.image}`} alt="Shoes" className="rounded-xl" />
              </figure>
              <div className="card-body items-center text-center overflow-hidden mx-5">
                <h2 className="card-title">{blog.title}</h2>
                <p>{blog.body}</p>
                <div className="card-actions">
                  <button className="btn btn-primary" onClick={() => navigate('/blog')}>View</button>
                </div>
              </div>
              </div>
            )
          )
            )}
        </div>
        <div className="join mt-12 container mx-auto justify-center">
          <button className="join-item btn" onClick={previous}>«</button>
          <button className="join-item btn">{paginate.current_page} - {totalPage}</button>
          <button className="join-item btn" onClick={next}>»</button>
        </div>
        <Footer />
    </div>
  )
}
