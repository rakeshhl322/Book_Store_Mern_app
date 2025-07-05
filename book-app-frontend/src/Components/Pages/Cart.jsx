import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import axios from 'axios'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart,setCart] = useState({})
  const [total,setTotal] = useState(0)
  const navigate = useNavigate()
    useEffect(() => {
    fetchData();
  },[cart])
      
  useEffect(() => {
    if(cart && cart.length>0){
      let total = 0;
      cart.map((items) => {
        total+=items.price;
      })
      setTotal(total)
    }
  },[cart])
    const token = localStorage.getItem('token'); 
    const fetchData = async () => {
          const headers = {
            id:localStorage.getItem('id'),
            Authorization: `Bearer ${token}`,
        };
           const response = await axios.get('/api/v1/get-user-cart', {headers});

          setCart(response.data.data)
      }

      const deleteItem = async (bookid) => {
        const headers = {
            id:localStorage.getItem('id'),
            Authorization: `Bearer ${token}`,
        };
         const response = await axios.put(`/api/v1/remove-book-from-cart/${bookid}`, {},{headers});
        alert(response.data.message)
      }

      const placeOrder = async () => {
         const headers = {
            id:localStorage.getItem('id'),
            Authorization: `Bearer ${token}`,
        };
         const response = await axios.post('/api/v1/place-order', {
          order: cart
         },{headers});
         alert(response.data.message)
         navigate('/profile/orderHistory')
      }
  return (
    <div className="bg-zinc-900 min-h-screen px-4 md:px-12 py-8">
      {!cart && <Loader />}
      {cart && cart.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <p className="text-3xl md:text-5xl text-zinc-400 font-semibold mb-4">
            Cart is empty.
          </p>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-3xl md:text-4xl text-white font-bold mb-8">
            Your Cart
          </h1>
          <div className="space-y-6">
            {cart.map((items, i) => (
              <div
                className="flex flex-col md:flex-row items-center bg-zinc-800 rounded-lg shadow-md p-4 md:p-6"
                key={i}
              >
                <img
                  src={items.url}
                  alt={items.title}
                  className="h-40 w-32 md:h-32 md:w-24 object-cover rounded-md shadow"
                />
                <div className="flex-1 w-full md:ml-8 mt-4 md:mt-0">
                  <h2 className="text-xl md:text-2xl text-zinc-100 font-semibold">
                    {items.title}
                  </h2>
                  <p className="text-sm text-zinc-300 mt-2 hidden lg:block">
                    {items.desc.slice(0, 100)}...
                  </p>
                  <p className="text-sm text-zinc-300 mt-2 hidden md:block lg:hidden">
                    {items.desc.slice(0, 65)}...
                  </p>
                  <p className="text-sm text-zinc-300 mt-2 md:hidden">
                    {items.desc.slice(0, 40)}...
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg text-zinc-200 font-medium">
                      ₹{items.price}
                    </span>
                    <button
                      className="flex items-center bg-red-100 hover:bg-red-200 text-red-700 border border-red-700 rounded p-2 transition"
                      onClick={() => deleteItem(items._id)}
                      title="Remove from cart"
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-10">
            <div className="bg-zinc-800 rounded-lg p-6 w-full max-w-sm shadow-lg">
              <div className="text-2xl text-zinc-200 font-semibold mb-2">
                Total Amount
              </div>
              <div className="flex items-center justify-between text-lg text-zinc-200 mb-4">
                <span>{cart.length} books</span>
                <span className="font-bold">₹{total}</span>
              </div>
              <button
                className="w-full bg-zinc-100 hover:bg-zinc-300 text-zinc-900 font-semibold rounded px-4 py-2 transition"
                onClick={placeOrder}
              >
                Place your order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
  
}

export default Cart
