import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader';
import { FaUser } from 'react-icons/fa';

const Allorders = () => {
    const [Allorders,setAllorders] = useState([])
      useEffect(() => {
        fetchData();
      },[])
          
        const token = localStorage.getItem('token'); 
        const fetchData = async () => {
              const headers = {
                id:localStorage.getItem('id'),
                Authorization: `Bearer ${token}`,
            };
               const response = await axios.get('/api/v1/get-all-orders', {headers});
              setAllorders(response.data.data)
          }
return (
  <React.Fragment>
    {/* Loader example, show when books is empty */}
    {Allorders.length === 0 && (
      <div className="h-[100%] flex items-center justify-center">
        <Loader />
      </div>
    )}
    {/* Orders Table */}
    {Allorders.length > 0 && (
      <div className="h-[100%] p-0 md:p-4 text-zinc-100">
        <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
          All Orders
        </h1>
        <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
          <div className="w-[3%]">
            <h1 className="text-center">Sr.</h1>
          </div>
          <div className="w-[40%] md:w-[22%]">
            <h1 className="">Books</h1>
          </div>
          <div className="w-0 md:w-[45%] hidden md:block">
            <h1 className="">Description</h1>
          </div>
          <div className="w-[17%] md:w-[9%]">
            <h1 className="">Price</h1>
          </div>
          <div className="w-[30%] md:w-[16%]">
            <h1 className="">Status</h1>
          </div>
          <div className="w-[10%] md:w-[5%]">
            <h1 className="">
              <FaUser />
            </h1>
          </div>
        </div>
        {/* Orders List */}
        <div>
          {Allorders.map((items, i) => (
            <div
              key={items._id || i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300 mt-2"
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <a
                  href={`/view-book-details/${items.book._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book.title}
                </a>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">
                  {items.book.desc ? items.book.desc.slice(0, 50) : ''} ...
                </h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">{items.book.price}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button className="hover:scale-105 transition-all duration-300">
                    {items.status === "Order placed" ? (
                      <span className="text-yellow-500">{items.status}</span>
                    ) : items.status === "Canceled" ? (
                      <span className="text-red-500">{items.status}</span>
                    ) : (
                      <span className="text-green-500">{items.status}</span>
                    )}
                  </button>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%] flex items-center">
                <span>
                  <FaUser />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </React.Fragment>
)
}
export default Allorders;
