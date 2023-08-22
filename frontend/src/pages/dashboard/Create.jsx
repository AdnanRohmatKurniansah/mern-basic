import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import { createBlog } from '../../libs/api'
import Swal from 'sweetalert2'

export default function Create() {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [image, setImage] = useState("")
  const [validation, setValidation] = useState({})
  const [imgPreview, setImgPreview] = useState(null)
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!token) {
        navigate('/login')
    }
  }, [])

  const preview = (event) => {
    setImage(event.target.files[0])

    const imgUrl = URL.createObjectURL(event.target.files[0])
    setImgPreview(imgUrl)
  }

  const create = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('image', image);

    const toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    });

    const response = await createBlog(formData)
    if (response.data) {
        toast.fire({
            icon: "success",
            text: response.data.message
        });
        navigate('/dashboard');
    } else {
        if (response.response.status === 400) {
            setValidation(response.response.data.errors);
        } else {
            toast.fire({
                text: response.response.data.message,
                icon: "error"
            });
        }
    }   
    }

  return (
    <div>
        <Navbar />
        <div className="container mx-auto mt-10 flex justify-center">
            <div className="w-full md:w-2/5 mx-5 md:mx-0 border border-gray justify-center rounded-xl p-5 py-16">
               <form onSubmit={create}>
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
                        imgPreview && <img src={imgPreview} style={{ width: '200px', marginBottom: '10px' }} />
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
