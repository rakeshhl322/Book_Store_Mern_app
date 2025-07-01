import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { GrLanguage } from "react-icons/gr";
import Loader from '../Loader/Loader';

const ViewBookDetails = () => {
  const {id} = useParams();
    console.log(id,'id')
    const [book, setBook] = useState('');
          useEffect(() => {
              fetchData()
          },[])
      
      const fetchData = async () => {
              //   const token = localStorage.getItem('bookstore'); // Example: retrieving from localStorage
              const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRoQ2xhaW1zIjpbeyJuYW1lIjoibmFuZGFuMSJ9LHsicm9sZSI6ImFkbWluIn1dLCJpYXQiOjE3NTEyMTMxODcsImV4cCI6MTc1MjA3NzE4N30.w6zjKxqA1nkjlXBmw3RdQK1I_dMo6Oe8X7nrsX7Pg2E'
              const config = {
          headers: {
              Authorization: `Bearer ${token}`,
          },
          };
  
                const response = await axios.get(`/api/v1/get-book-by-id/${id}`, config);

          console.log(response)
          setBook(response.data.data)
          console.log(book)
      }
    return (
        <>
        {!book && <Loader/>}
        {book && <div className='px-12 py-8 bg-zinc-900 flex flex-col md:flex-row gap-4'>
        <div className='h-[40vh] bg-zinc-800 rounded  p-4 w-full lg:w-3/6 h-[88vh] items-center justify-center'>
        <img src={book.url} className="h-[50vh]  lg:h-[70vh] mt-11" alt="" />
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
