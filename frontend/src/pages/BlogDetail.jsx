import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BlogDetail() {
  return (
    <div>
        <Navbar />
        <div className="mx-10 md:container pt-10 md:mx-auto mt-5 pb-20 md:grid md:grid-cols-2 gap-4">
            <figure className="px-0 md:px-10">
              <img src="https://placehold.co/600x400" alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="detail">
              <h1 className='text-2xl font-bold mt-5 md:mt-0'>Judul blog</h1>
              <h3 className='mt-5'><span className='font-bold'>Author</span> : Adnan | <span className='font-bold'>Created at</span> : 0909898989</h3>
              <div className="desc mt-7 text-justify">
                <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae placeat molestias deserunt in, sint impedit soluta facere, dicta illo ad repellat accusantium. Laudantium odit perferendis eaque sed, omnis nesciunt iste quos sit placeat exercitationem sapiente ea atque necessitatibus ducimus architecto eligendi nulla non dolore iusto minima nihil totam impedit explicabo sint. Fugit architecto placeat optio, asperiores accusamus magni eos ex commodi iste? At necessitatibus sint accusantium doloremque quis quaerat tempore, molestiae, consectetur amet illo earum cumque. Cupiditate veritatis cum possimus dicta nostrum veniam enim officiis necessitatibus nobis reiciendis at omnis sed aliquam rem, iusto quasi itaque eius velit voluptates! Distinctio?</h6>
              </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}
