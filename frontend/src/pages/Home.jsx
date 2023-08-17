import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
        <Navbar />
        <div className="mx-10 md:container md:mx-auto mt-10 md:grid md:grid-cols-4 gap-4">
          <div className="card bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
              <img src="https://placehold.co/600x400" alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions">
                <button className="btn btn-primary">View</button>
              </div>
            </div>
          </div>
        </div>
        <div className="join mt-12 container mx-auto justify-center">
          <button className="join-item btn">1</button>
          <button className="join-item btn btn-active">2</button>
          <button className="join-item btn">3</button>
          <button className="join-item btn">4</button>
        </div>
        <Footer />
    </div>
  )
}
