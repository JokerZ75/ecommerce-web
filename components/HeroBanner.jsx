import React from 'react'
import Link from 'next/link'

const HeroBanner = () => {
  return (
    <div className='w-screen bg-slate-300 p-10 pb-5 h-1/2 max-h-1/2 relative'>
        <div>
            <p className='text-2xl'>Small Text</p>
            <h3 className='text-5xl font-bold'>MID TEXT</h3>
            <img src="" alt="HeroBanner img" className='float-right'/>
            <div>
                <Link href="/movies">
                    <button className='bg-red-600 py-1 px-5 rounded-xl text-white font-bold mt-8' type="button">Button Text</button>
                </Link>
            </div>
            <div className='absolute bottom-10 right-10 left-10 flex flex-col'>
                <h4 className='text-lg font-bold text-cyan-700 ml-auto'>Description</h4>
                <p className='font-light'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda fugiat, cupiditate qui dolorem veritatis, veniam pariatur consequuntur odit corrupti quas consequatur. Eos modi quo vel ipsum amet dignissimos cupiditate debitis.</p>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner