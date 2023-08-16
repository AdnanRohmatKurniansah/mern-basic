import React from 'react'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div>
        <Navbar />
        Home
        <ul>
          <li><a href="/register">register</a></li>
        </ul>
    </div>
  )
}
