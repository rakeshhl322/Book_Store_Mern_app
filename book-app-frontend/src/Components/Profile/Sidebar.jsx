import React from 'react'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'

const Sidebar = (user) => {
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-center'>
      <img src={user.data.avatar} alt="" className='h-[12vh]' />
      <p className='mt-3 text-xl text-zinc-100 lg:block'>
        {user.data.userName}
      </p>
      <p className='mt-1 text-normal text-zinc-300 '>
        {user.data.email}
      </p>
      <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'>
       <Link to="/profile/favourites"
        className="text-zinc-100 w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Favourites</Link>
       <Link to="/profile/orderHistory"
        className="text-zinc-100 w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Order History</Link>
       <Link to="/profile/settings" 
       className="text-zinc-100 w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Settings</Link>
           
      </div>
    </div>
  )
}

export default Sidebar
