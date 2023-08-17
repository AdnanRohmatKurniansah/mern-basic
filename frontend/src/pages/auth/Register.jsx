import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function Register() {
  return (
    <div>
      <Navbar />
        <div className="container mx-auto mt-10 flex justify-center">
            <div className="w-full md:w-1/3 mx-10 md:mx-0 bg-gray-100 rounded-xl p-5 py-20">
               <h4 className='text-2xl font-bold text-center'>Register</h4>
               <form className='mt-5' action="">
                <input type="text" placeholder="Name" className="input my-3 input-bordered w-full" />
                <input type="email" placeholder="Email" className="input my-3 input-bordered w-full" />
                <input type="password" placeholder="Password" className="input my-3 input-bordered w-full" />
               </form>
               <small>Already registered? <a className="underline" href="/login">login now</a></small>
            </div>
        </div>
      <Footer />
    </div>
  )
}
