import React from 'react'
import   bookImg  from '../../assets/book-img.png'
import { Link } from 'react-router-dom'
import { FaGripLines } from "react-icons/fa";
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const [mobileNav,setMobileNav] = useState("hidden")
  
    const links = [
        {
            title: "Home",
            link:"/",
        },
        {
            title: "All Books",
            link:"/all-books",
        },
      
        {
            title: "Cart",
            link:"/cart",
        },
        {
            title: "Profile",
            link:"/profile",
        },
          {
            title: "About Us",
            link:"/about-us",
        },
      
    ]
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
    if(isLoggedIn === false){
        links.splice(2,2)
    }
  return (
    <>
    <nav className='z-50 relative bg-zinc-800 text-white px-8 py-4 flex justify-between items-center'>
         <Link to="/" className='flex items-center'>
        <div><img src={bookImg} alt="book-logo" className='h-10 me-4' /></div>
      <div className='text-2xl font-semi-bold'>BookHaven</div>
      </Link>
       <div className='nav-links-bookheaven block md:flex items-center gap-4'>
        <div className='hidden md:flex gap-4 '>
            {links.map((items,i) => (
               <Link 
               to={items.link}
               className='hover:text-blue-500 cursor-pointer transition-all duration-300' key={i}>
                {items.title}</Link> 
            ))
            }
        </div>
            {isLoggedIn === false && <>
            <Link to="/login" className={`{mobileNav}mb-8 px-8 text-2xl py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>Login</Link>
            <Link to="/signup" className={`{mobileNav}mb-8 px-8 text-2xl py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
            </>}
        <button onClick={() => 
            mobileNav === "hidden"?
             setMobileNav("block"): 
             setMobileNav("hidden")} 
             className='block md:hidden text-white text-2xl hover:text-zinc-400'>
            <FaGripLines />
        </button>
       </div>
    </nav>
    <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 z-48 flex flex-col items-center justify-between`}>
          {links.map((items,i) => (
               <Link 
               to={items.link}
               className='text-white text-2xl mb-8 hover:text-blue-500 cursor-pointer transition-all duration-300' key={i}>
                {items.title}</Link> 
            ))
            }
            {isLoggedIn === false && <>
            <Link to="/login" className={`{mobileNav}mb-8 px-8 text-2xl py-2 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>Login</Link>
            <Link to="/signup" className={`{mobileNav}mb-8 px-8 text-2xl py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300`}>SignUp</Link>
            </>}

            
    </div>
    </>
  )
}

export default Navbar
