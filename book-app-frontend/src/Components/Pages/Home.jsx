import React from 'react'
import Hero from '../Home/Hero'
import Recent from '../Home/Recent'
const Home = () => {
  return (
    <div className='bg-zinc-900 text-white px-10 py-8'>
      <Hero/>
      <Recent/>
    </div>
  )
}

export default Home
