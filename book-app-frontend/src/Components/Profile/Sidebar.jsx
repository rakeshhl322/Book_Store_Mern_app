import React  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/auth';
import avatar from './../../assets/avatar-png-115540218987bthtxfhls.png'
import { FaArrowRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
const Sidebar = (user) => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const role = useSelector((state) => state.auth.role)

  return (
    <div className='bg-zinc-800 p-4 rounded flex md:h-auto h-[100%] flex-col items-center justify-between'>
      <div className='flex items-center flex-col justify-center w-full'>
        <img src={avatar} alt="" className='h-[12vh]' />
        <p className='mt-3 text-xl text-zinc-100 lg:block'>
          {user.data.userName}
        </p>
        <p className='mt-1 text-normal text-zinc-300 '>
          {user.data.email}
        </p>
      </div>
      <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
      {role === "user" && (
        <div className='w-full flex flex-col items-center justify-center gap-2 hidden lg:flex'>
          <Link to="/profile/favourites"
            className="text-zinc-100 w-full h-12 flex items-center justify-center mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Favourites</Link>
          <Link to="/profile/orderHistory"
            className="text-zinc-100 w-full h-12 flex items-center justify-center mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Order History</Link>
          <Link to="/profile/settings"
            className="text-zinc-100 w-full h-12 flex items-center justify-center mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Settings</Link>
        </div>
      )}
      {role === "admin" && (
        <div className='w-full flex flex-col items-center justify-center gap-2 hidden lg:flex'>
          <Link to="/profile/addbook"
            className="text-zinc-100 w-full h-12 flex items-center justify-center mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">Add Book</Link>
          <Link to="/profile/allorders"
            className="text-zinc-100 w-full h-12 flex items-center justify-center mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">All Orders</Link>
        </div>
      )}
      <button onClick={() => {
        dispatch(authActions.logout())
        dispatch(authActions.changeRole("user"));
        localStorage.clear("id");
        localStorage.clear("token");
        localStorage.clear("role");
        history('/')
      }} className='bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white flex items-center justify-center py-2 rounded hover:bg-white hover:text-shadow-zinc-900 transition-all duration-200 '>
        Logout <FaArrowRight />
      </button>
    </div>
  )
}

export default Sidebar
