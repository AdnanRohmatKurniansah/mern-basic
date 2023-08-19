import React from 'react'

export default function Navbar() {
  return (
    <div className="navbar bg-primary text-white">
        <div className="navbar-start">
            <a className="btn btn-ghost normal-case text-3xl" href='/'>Mern.</a>
        </div>
        <div className="navbar-end">
            <a className="btn" href='/login'>Login</a>
        </div>
    </div>
  )
}
