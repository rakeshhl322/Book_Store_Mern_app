import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = (data) => {
    const bookdata = data.data;
    console.log(bookdata.url)
    return (
    <>
    
      <Link to={`/view-book-details/${bookdata._id}`}>
        <div className='bg-zinc-800 rounded p-4 flex flex-col h-[90vh]'>
            <div className='bg-zinc-900 rounded flex items-center justify-center'>
                <img className='h-[20-vh]' src={bookdata.url} alt='/'/></div>
                <h2 className='mt-4 text-xl text-zinc-200 '>{bookdata.title}</h2>
                <p className='mt-2 text-zinc-200 '>by{bookdata.author}</p>
                <p className='mt-2 text-zinc-200 '>₹{bookdata.price}</p>
        </div>
      </Link>
    </>
  )
}

export default BookCard
