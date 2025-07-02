import React from 'react'
import { Link } from 'react-router-dom'
// import { useSelector } from 'react-redux'
import avatar from './../../assets/avatar-png-115540218987bthtxfhls.png'
import { FaArrowRight } from 'react-icons/fa'
const Sidebar = (user) => {
  return (
    <div className='bg-zinc-800 p-4 rounded flex h-[100%] flex-col items-center justify-between'>
     <div className='flex items-center flex-col justify-center'>
      <img src={avatar} alt="" className='h-[12vh]' />
       <p className='mt-3 text-xl text-zinc-100 lg:block'>
        {user.data.userName}
      </p>
      <p className='mt-1 text-normal text-zinc-300 '>
        {user.data.email}
      </p>
      <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'>
     </div>
      <div className='w-full flex-col items-center justify-center hidden lg:flex'>
       <Link to="/profile/favourites"
        className="text-zinc-100 w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Favourites</Link>
       <Link to="/profile/orderHistory"
        className="text-zinc-100 w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Order History</Link>
       <Link to="/profile/settings" 
       className="text-zinc-100 w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Settings</Link>
      
      </div>
           
      </div>
      <button className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white flex items-center justify-center py-2 rounded hover:bg-white hover:text-shadow-zinc-900 transition-all duration-200 '>
        Logout <FaArrowRight/>
      </button>
    </div>
  )
}

export default Sidebar
