import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import Swal from'sweetalert2'
import { register } from '../../libs/api'

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validation, setValidation] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])

  const registerHandle = async (e) => {
    e.preventDefault()
    
    const formData = new FormData()
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);

    const toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })

    register(formData)
      .then(({data}) => {
        toast.fire({
          icon: "success",
          text: data.message
        })
        navigate('/login')
      }).catch(({response}) => {
        if (response.status === 409) {
          toast.fire({
            text: response.data.message,
            icon: "error"
          })
        } else {
          setValidation(response.data.message.errors)
          toast.fire({
            text: response.data.message.name,
            icon: "error"
          })
        } 
      })
  }

  return (
    <div>
      <Navbar />
        <div className="container mx-auto mt-10 flex justify-center">
            <div className="w-full md:w-1/3 mx-10 md:mx-0 bg-blue-400 rounded-xl p-5 py-16">
               <h4 className='text-2xl font-bold text-center'>Register</h4>
               <form onSubmit={registerHandle} className='mt-5'>
                <input type="text" required value={name} placeholder="Name" onChange={(event)=>{setName(event.target.value)}} className="input my-3 input-bordered w-full" />
                {
                  validation.name && (
                    <span className="text-red-600 text-xs">
                        {validation.name.message}
                    </span>
                  )                        
                }
                <input type="email" required value={email} placeholder="Email" onChange={(event)=>{setEmail(event.target.value)}} className="input my-3 input-bordered w-full" />
                {
                  validation.email && (
                    <span className="text-red-600 text-xs">
                        {validation.email.message}
                    </span>
                  )                        
                }
                <input type="password" required value={password} placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}} className="input my-3 input-bordered w-full" />
                {
                  validation.password && (
                    <span className="text-warning text-xs mt-1">
                        {validation.password.message}
                    </span>
                  )                        
                }
                <small>Already registered? <a className="underline" href="/login">login now</a></small><br />
                <button className='btn btn-primary btn-sm mt-5' type='submit'>Submit</button>
               </form>
            </div>
        </div>
      <Footer />
    </div>
  )
}
