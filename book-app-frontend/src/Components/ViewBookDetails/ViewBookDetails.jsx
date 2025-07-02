import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { GrLanguage } from "react-icons/gr";
import Loader from '../Loader/Loader';
import { FaCartPlus, FaEdit, FaHeart } from 'react-icons/fa';
import { AiOutlineDelete } from "react-icons/ai";

const ViewBookDetails = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const role = useSelector((state) => state.auth.role)
  const {id} = useParams();
    const [book, setBook] = useState('');
          useEffect(() => {
              fetchData()
          },[])
      const token = localStorage.getItem('token'); // Example: retrieving from localStorage

      const fetchData = async () => {
            //   const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW1zIjpbeyJuYW1lIjoibmFuZGFuMSJ9LHsicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3NTEyMTMxODcsImV4cCI6MTc1MjA3NzE4N30.w6zjKxqA1nkjlXBmw3RdQK1I_dMo6Oe8X7nrsX7Pg2E'
              const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          };
  
                const response = await axios.get(`/api/v1/get-book-by-id/${id}`, config);

          setBook(response.data.data)
      }
       const handleFavourite = async () => {
            const headers = {
            id:localStorage.getItem('id'),
            Authorization: `Bearer ${token}`,
            bookid : id,
        };
        const response = await axios.put('/api/v1/add-book-to-favourites/', {},{headers});
        alert(response.data.message)
    }
       const handleCart = async () => {
            const headers = {
            id:localStorage.getItem('id'),
            Authorization: `Bearer ${token}`,
            bookid : id,
        };
        const response = await axios.put('/api/v1/add-to-cart/', {},{headers});
        alert(response.data.message)
    }

    return (
        <>
        {!book && <Loader/>}
        {book && <div className='px-12 py-8 bg-zinc-900 flex flex-col md:flex-row '>
        <div className='h-[60vh] bg-zinc-800 rounded  p-4 w-full lg:w-3/6 lg:h-[88vh] items-center justify-around'>
        <div className='flex justify-around'>
        <img src={book.url} className="h-[40vh]  lg:h-[70vh] mt-11" alt="" />
       <div className='flex flex-col'>
      {isLoggedIn === true && role === 'user' ? (
        <>
          <button onClick={handleFavourite} className='bg-white rounded-full text-2xl p-2 mt-4 text-red-500'>
            <FaHeart />
          </button>
          <button onClick={handleCart} className='bg-white rounded-full text-2xl p-2 mt-4 text-blue-500'>
            <FaCartPlus />
          </button>
        </>
      ) : (
        ''
      )}
      {isLoggedIn === true && role === 'admin' ? (
        <>
          <button className='bg-white rounded-full text-2xl p-2 mt-4 text-red-500'>
            <FaEdit />
          </button>
          <button className='bg-white rounded-full text-2xl p-2 mt-4 text-blue-500'>
            <AiOutlineDelete />
          </button>
        </>
      ) : (
        ''
      )}
    </div>
</div>
        
        </div>

        <div className='p-4 w-3/6'>
            <h1 className='text-4xl text-zinc-300'>{book.title}</h1>
            <p className='mt-1 text-zinc-400 '>by{book.author}</p>
            <p className='mt-4 text-zinc-500 text-xl'>{book.desc}</p>
            <p className='mt-4 items-center justify-start text-white '>
                <GrLanguage className='mt-3'/>{book.language}
            </p>
            <p className='mt-4 text-zinc-100 text-2xl '>Price: ₹{book.price}</p>

        </div>
    </div>}
    </>
  )
}

export default ViewBookDetails
