import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { editBlog, show } from '../../libs/api'
import Swal from 'sweetalert2'
import Footer from '../../components/Footer'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Edit() {
  const { id } = useParams();
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [imgPreview, setImgPreview] = useState(null)
  const [image, setImage] = useState("")
  const [validation, setValidation] = useState({})
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      loadBlog()
    }
  }, [])

  const loadBlog = async () => {
    try {
      const { data } = await show(id)
      const { title, body, image } = data.data

      setTitle(title)
      setBody(body)
      setImage(image)
    } catch (error) {
      console.log(error.response)
    }
  }

  const toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
  })  

  const preview = (event) => {
    setImage(event.target.files[0])

    const imgUrl = URL.createObjectURL(event.target.files[0])
    setImgPreview(imgUrl)
  }

  const edit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('_method', 'PUT')
    formData.append('title', title)
    formData.append('body', body)
    if (image !== null) {
        formData.append('image', image)
    }

    const response = await editBlog(id, formData)
    if (response.data) {
      toast.fire({
        icon: "success",
        text: response.data.message
      })
      navigate('/dashboard')
    } else {
      if (response.response.status === 400) {
        setValidation(response.response.data.errors)
      } else {
        toast.fire({
          text: response.response.data.message,
          icon: "error"
        })
      }
    }
  }

  return (
    <div>
        <Navbar />
            <div className="container mx-auto mt-10 flex justify-center">
                <div className="w-full md:w-2/5 mx-5 md:mx-0 border border-gray justify-center rounded-xl p-5 py-16">
                <form onSubmit={edit}>
                    <input type="text" required value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Title" className="input input-bordered mb-3 w-full" />
                    {
                        validation[0] && (
                            <span className="text-red-600 text-xs mb-1">
                                {validation[0].msg}
                            </span>
                        )                        
                    }
                    <textarea required className="textarea textarea-bordered mb-3 w-full" value={body} onChange={(event) => setBody(event.target.value)} placeholder='Body' cols="30" rows="5">{body}</textarea>
                    {
                        validation[1] && (
                            <span className="text-red-600 text-xs mb-1">
                                {validation[1].msg}
                            </span>
                        )                        
                    }
                    {
                      imgPreview ? (
                        <img src={imgPreview} style={{ width: '200px', marginBottom: '10px' }} />
                      ) : (
                        image && <img src={`http://localhost:3000/${image}`} style={{ width: '200px', marginBottom: '10px' }} />
                      )
                    }
                    <input type="file" onChange={preview} className="file-input w-full" />
                    <button className='btn btn-info mt-10' type='submit'>Submit</button>
                </form>
                </div>
            </div>
        <Footer />
    </div>
  )
}
