import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [books,setBooks] = useState([])
  useEffect(() => {
    fetchData();
  },[])
      
    const token = localStorage.getItem('token'); 
    const fetchData = async () => {
          const headers = {
            id:localStorage.getItem('id'),
            Authorization: `Bearer ${token}`,
        };
           const response = await axios.get('/api/v1/get-favourite-books', {headers});

          setBooks(response.data.data)
      }
  return (
    <div className='grid grid-cols-4 gap-2 m-2'>
      {books.length===0 && (
        <>
          <h3>No books is in favourites</h3>
        </>
      )}
      {books && books.map((items,i) => 
      <>
      <div key={i}>
        <BookCard key={i} data={items} />
      </div>
      </>
      )}
    </div>
  )
}

export default Favourites
