import React, { useEffect, useState } from 'react'
import Sidebar from '../Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/Loader'

const Profile = () => {
  const [user,setUser] = useState('')
  // const isLoggedIn = useSelector();
     useEffect(() => {
            fetchData()
        },[])
    
    const fetchData = async () => {
            //   const token = localStorage.getItem('bookstore'); // Example: retrieving from localStorage
            const token = localStorage.getItem('token')
            const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            id: localStorage.getItem('id')
        },
        };

        const response = await axios.get("/api/v1/get-user-information",config);
        setUser(response.data)
    }
  return (
    <div className='text-white bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row md:h-auto  lg:h-screen py-8'>
       {!user && <Loader/>}
       {user && 
       <>
       <div className='w-full md:w-1/6'>
          <Sidebar data={user}/>
        </div>
        <div className='w-5/6'>
          <Outlet/>
        </div>
        </>
        }
    </div>
  )
}

export default Profile
