import React from 'react'
import Loader from '../Loader/Loader'
import BookCard from '../BookCard/BookCard'
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
const AllBooks = () => {
       const [allBooks, setAllBooks] = useState('');
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

        const response = await axios.get("/api/v1/get-all-books",config);
        setAllBooks(response.data.data)
    }
  return (
    <div className='bg-zinc-900 px-4'>
       <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>All books</h4>
      <div className='flex items-center justify-center'>
       {!allBooks && <Loader/>}
      </div>
    <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {allBooks && allBooks.map((items,i) =>  
        <div key={i}>
            <BookCard data = {items}/>
        </div> 
        )}
    </div>
    </div>
    </div>
  )
}

export default AllBooks
