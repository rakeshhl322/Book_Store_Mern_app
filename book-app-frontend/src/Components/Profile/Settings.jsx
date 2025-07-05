import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from "../Loader/Loader";

const Settings = () => {

  const [value, setValue] = useState({address:""})
  const [profileData, setProfileData] = useState()
  useEffect(() => {
      fetchData();
    },[])
        
      const token = localStorage.getItem('token'); 
      const fetchData = async () => {
            const headers = {
              id:localStorage.getItem('id'),
              Authorization: `Bearer ${token}`,
          };
             const response = await axios.get('/api/v1/get-user-information',{headers});
           
            setProfileData(response.data)
            setValue(response.data.address)
          
        }
  
        const submitAddress = async () => {
           const headers = {
              id:localStorage.getItem('id'),
              Authorization: `Bearer ${token}`,
          };
             const response = await axios.put('/api/v1/update-address', value,{headers});
            alert(response.data.message)
        }
  return (
    <div>
      {(!value && !profileData) && (
        <Loader />
      )}
      {profileData && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Settings
          </h1>
          <div className="flex gap-12">
            <div>
              <label htmlFor="">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.userName}
              </p>
            </div>
            <div>
              <label htmlFor="">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col">
            <label htmlFor="">Address</label>
            <textarea
              className="p-2 rounded bg-zinc-800 mt-2 font-semibold"
              rows="5"
              placeholder="Address"
              name="address"
              value={value.address}
              onChange={e => setValue({ ...value, address: e.target.value })}
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button onClick={submitAddress} className="bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400">
              Update
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings
