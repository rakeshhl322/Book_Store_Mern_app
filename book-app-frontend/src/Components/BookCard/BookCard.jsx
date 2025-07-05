import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({ data, favourites = false, onRemoveFavourite  }) => {
    const bookdata = data;
    return (
     <>
      <Link to={`/view-book-details/${bookdata._id}`}>
        <div className='bg-zinc-800 rounded p-4 flex flex-col h-[90vh]'>
          <div className='bg-zinc-900 rounded flex items-center justify-center'>
            <img className='h-[20vh]' src={bookdata.url} alt='' />
          </div>
          <h2 className='mt-4 text-xl text-zinc-200'>{bookdata.title}</h2>
          <p className='mt-2 text-zinc-200'>by {bookdata.author}</p>
          <p className='mt-2 text-zinc-200'>₹{bookdata.price}</p>
        </div>
      </Link>
      {favourites && (
        <button
          onClick={() => onRemoveFavourite(bookdata._id)}
          className='cursor-pointer bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500 mt-4'
        >
          Remove from favourites
        </button>
      )}
    </>
    )
}

export default BookCard
