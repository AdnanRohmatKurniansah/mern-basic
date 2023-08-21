import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const token = localStorage.getItem('token')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true)
    }
  })

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className="navbar bg-primary text-white">
        <div className="navbar-start">
            <a className="btn btn-ghost normal-case text-3xl" href='/'>Mern.</a>
        </div>
        <div className="navbar-end">
            {
              isLoggedIn ? (
                <button className='btn btn-info' onClick={logout}>Logout</button>
              ) : (
                <a className="btn" href='/login'>Login</a>
              )
            } 
        </div>
    </div>
  )
}
