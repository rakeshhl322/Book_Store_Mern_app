import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from 'react-router-dom';
const OrderHistory = () => {
  
const [OrderHistory, setOrderHistory] = useState()
useEffect(() => {
    fetchData();
  },[])
      
    const token = localStorage.getItem('token'); 
    const fetchData = async () => {
          const headers = {
            id:localStorage.getItem('id'),
            Authorization: `Bearer ${token}`,
        };
           const response = await axios.get('/api/v1/get-order-history', {headers});
       
          setOrderHistory(response.data.data)
      }
  return (
      
      <>
      {!OrderHistory && <div> <Loader /></div>}
      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100 ">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5x1 font-semibold text-zinc-500 mb-8">
              No Order History
            </h1>
            <img
              src="https://cdn-icons-png.flaticon.com/128/9961/9961218.png"
              alt=""
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}
      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3x1 md:text-5x1 font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%] ">
              <h1 className="">Books</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="">Mode</h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            <div
              key={items._id || i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 cursor-pointer"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%] ">
                <Link
                  to={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </Link>
              </div>
              <div className="w-[45%]">
                <h1 className="">
                  {items.book.desc.slice(0, 50)} .....
                </h1>
              </div>
              <div className="w-[9%]">
                <h1 className="">{items.book.price}</h1>
              </div>
              <div className="w-[16%]">
                <h1 className="font-semibold">
                  {items.status === "Order placed" ? (
                    <span className="text-yellow-500">{items.status}</span>
                  ) : items.status === "Canceled" ? (
                    <span className="text-red-500">{items.status}</span>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrderHistory;



