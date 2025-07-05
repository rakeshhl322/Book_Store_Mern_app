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
      const handleRemoveFavourite = async (bookId) => {
  const headers = {
    id: localStorage.getItem('id'),
    Authorization: `Bearer ${token}`,
    bookid: bookId,
  };
  try {
    const response = await axios.put('/api/v1/remove-book-from-favourites', {}, { headers });
    alert(response.data.message);

    // Update local state after successful removal
    setBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  } catch (error) {
    console.error('Error removing book from favourites:', error);
  }
};

// Pass the callback to BookCard
  return (
    <div className='grid grid-cols-4 gap-2 m-2'>
      {books.length===0 && (
        <>
          <h3>No books is in favourites</h3>
        </>
      )}
      {books && books.map((items,i) => 
        <div key={i}>
        <BookCard data={items} favourites={true} onRemoveFavourite={handleRemoveFavourite} />
        </div>
      )}
    </div>
  )
}

export default Favourites
