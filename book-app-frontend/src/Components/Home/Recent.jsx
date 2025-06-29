import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';
const Recent = () => {
    const [recentBooks, setRecentBooks] = useState('');
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

        const response = await axios.get("/api/v1/get-recent-books",config);

        setRecentBooks(response.data.data)
    }
  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>Recently added books</h4>
      <div className='flex items-center justify-center'>
       {!recentBooks && <Loader/>}
      </div>
    <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {recentBooks && recentBooks.map((items,i) =>  
        <div key={i}>
            <BookCard data = {items}/>
        </div> 
        )}
    </div>
    </div>
  )
}

export default Recent
