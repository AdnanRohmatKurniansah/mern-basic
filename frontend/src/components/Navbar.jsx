import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

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
            <Link className="btn btn-ghost normal-case text-3xl" to={'/'}>Mern.</Link>
        </div>
        <div className="navbar-end">
            {
              isLoggedIn ? (
                <div>
                  <Link className="btn" to={'/dashboard'}>Dashboard</Link>
                  <button className='btn btn-info' onClick={logout}>Logout</button>
                </div>
              ) : (
                <Link className="btn" to={'/login'}>Login</Link>
              )
            } 
        </div>
    </div>
  )
}
