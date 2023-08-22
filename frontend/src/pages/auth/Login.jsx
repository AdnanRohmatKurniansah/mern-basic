import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { login } from '../../libs/api'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [validation, setValidation] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/dashboard')
    }
  }, [])

  const loginHandler = async (e) => {
    e.preventDefault()

    const formData = new FormData()

    formData.append('email', email)
    formData.append('password', password)

    const toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    })

    const response = await login(formData)
    if (response.data) {
      localStorage.setItem('token', response.data.token)
      toast.fire({
        icon: 'success',
        text: response.data.message
      })
      navigate('/dashboard')
    } else {
      if (response.response.status === 409 || response.response.status === 401) {
        toast.fire({
          text: response.response.data.message,
          icon: "error"
        })
      } else {
        setValidation(response.response.data.errors)
      } 
    }
  }

  return (
    <div>
      <Navbar />
        <div className="container mx-auto mt-10 flex justify-center">
            <div className="w-full mx-10 md:mx-0 md:w-1/3 bg-blue-400 rounded-xl p-5 py-24">
               <h4 className='text-2xl font-bold text-center'>Login</h4>
               <form onSubmit={loginHandler} className='mt-5'>
                <input type="email" required value={email} placeholder="Email" onChange={(event)=>{setEmail(event.target.value)}} className="input my-3 input-bordered w-full" />
                {
                  validation[0] && (
                    <span className="text-red-600 text-xs">
                        {validation[0].msg}
                    </span>
                  )                        
                }
                <input type="password" required value={password} placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}} className="input my-3 input-bordered w-full" />
                {
                  validation[1] && (
                    <span className="text-red-600 text-xs">
                        {validation[1].msg}
                    </span>
                  )                        
                }
                <small>Not registered? <a className="underline" href="/register">register now</a></small><br />
                <button className='btn btn-primary btn-sm mt-5' type='submit'>Submit</button>
               </form>
            </div>
        </div>
      <Footer />
    </div>
  )
}
