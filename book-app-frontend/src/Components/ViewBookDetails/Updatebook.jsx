import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Updatebook = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [Data, setData] = useState({
    url: '',
    title: '',
    author: '',
    price: '',
    desc: '',
    language: ''
  });

  const headers = {
    id: localStorage.getItem("id"),
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  useEffect(() => {
      const fetchData = async () => {
        try {
      
          
          setLoading(true);
          const token = localStorage.getItem('token');
          
          if (!token) {
            alert('No authentication token found. Please login again.');
            setLoading(false);
            return;
          }
          
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
              id: localStorage.getItem("id")
            },
          };
    
          const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`, config);
          
          if (response.data && response.data.data) {
            const bookData = response.data.data;
            // Pre-populate form fields with existing book data
            setData({
              url: bookData.url || '',
              title: bookData.title || '',
              author: bookData.author || '',
              price: bookData.price || '',
              desc: bookData.desc || '',
              language: bookData.language || ''
            });
          } else {
            throw new Error('Invalid response structure');
          }
        } catch (error) {
          console.error('Error fetching book data:', error);
          if (error.response) {
            console.error('Error response:', error.response.data);
            alert(`Error loading book data: ${error.response.data.message || 'Unknown error'}`);
          } else {
            alert('Error loading book data: Network error or server unavailable');
          }
        } finally {
          setLoading(false);
        }
      };
      
      if (id) {
        fetchData();
      } else {
        console.error('No book ID provided');
        alert('No book ID provided');
        setLoading(false);
      }
  }, [id]);
  
  const submit = async (e) => {
    e.preventDefault();
    try {
      setUpdating(true);
      if (
        !Data.url ||
        !Data.title ||
        !Data.author ||
        !Data.price ||
        !Data.desc ||
        !Data.language
      ) {
        alert("All fields are required");
        return;
      }
      
      const response = await axios.put(
        `http://localhost:1000/api/v1/update-book/${id}`,
        Data,
        { headers }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Error updating book");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <div className="text-zinc-400 mt-4">Loading book data...</div>
          </div>
        </div>
      ) : (
        <form className="p-4 bg-zinc-800 rounded" onSubmit={submit}>
        <div>
          <label htmlFor="url" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="url of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="title" className="text-zinc-400">
            Title
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="title of book"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="author" className="text-zinc-400">
            Author
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="author of book"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="desc" className="text-zinc-400">
            Description
          </label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="description of book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>
        <div className="mt-4 flex gap-4">
          <div className="w-3/6">
            <label htmlFor="language" className="text-zinc-400">
              Language
            </label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="language of book"
              name="language"
              required
              value={Data.language}
              onChange={change}
            />
          </div>
          <div className="w-3/6">
            <label htmlFor="price" className="text-zinc-400">
              Price
            </label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="price of book"
              name="price"
              required
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          disabled={updating}
        >
          {updating ? 'Updating...' : 'Update Book'}
        </button>
        </form>
      )}
    </div>
  )
}

export default Updatebook
