import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams } from 'react-router-dom'
import { show } from '../libs/api'

export default function BlogDetail() {
  const { id } = useParams()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [createdAt, setCreatedAt] = useState("")
  const [author, setAuthor] = useState({})

  useEffect(() => {
    loadDetail()
  }, [])

  const loadDetail = () => {
    show(id).then(({data}) => {
      const { title, body, image, createdAt, author } = data.data
      setTitle(title)
      setBody(body)
      setImage(image)
      setCreatedAt(createdAt)
      setAuthor(author)
    })
    .catch(({response}) => {
      console.log(response)
    })
  }

  return (
    <div>
        <Navbar />
        <div className="mx-10 md:container pt-10 md:mx-auto mt-5 pb-20 md:grid md:grid-cols-2 gap-4">
            <figure className="px-0 md:px-10">
              <img src={`http://localhost:3000/${image}`} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="detail">
              <h1 className='text-2xl font-bold mt-5 md:mt-0'>{title}</h1>
              <h3 className='mt-5'><span className='font-bold'>Author</span> : {author.nama} | <span className='font-bold'>Created at</span> : {createdAt}</h3>
              <div className="desc mt-7 text-justify">
                <h6>{body}</h6>
              </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
