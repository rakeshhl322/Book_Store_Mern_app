import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {
    const [values,setValues] = useState({
        userName:"",
        email: "",
        password: "",
        address: "",
    })
    const navigate = useNavigate();
    const change = (e) => {
        const {name, value} = e.target;
        setValues({...values,[name]:value})
    }

    const submit = async () => {
        try {
            if(values.userName === "" || values.email === "" || values.password === "" || values.address ===""){
                alert("All fields are required")
            }else{
        const response = await axios.post("/api/v1/sign-up",values);
alert(response.data.message)   
        navigate("/")         
    }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center'>
      <div className='bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
      <p className='text-zinc-200 text-xl'>
        Sign Up
      </p>
      <div className='mt-4'>
        <div className='mt-3'>
            <label htmlFor="" className='text-zinc-400'>
                Username
            </label>
            <input
            type='text'
            className='w-full mt-1 bg-zinc-800 text-zinc-100 p-2 outline-1'
            placeholder='username'
            name='userName'
            required
            value={values.userName}
            onChange={change}
            />
        </div>
        <div className='mt-3'>
            <label htmlFor="" className='text-zinc-400'>
                Email
            </label>
            <input
            type='text'
            className='w-full mt-1 bg-zinc-800 text-zinc-100 p-2 outline-1'
            placeholder='xyz@gmail.com'
            name='email'
            required
            value={values.email}
            onChange={change}
            />
        </div>
        <div className='mt-3'>
            <label htmlFor="" className='text-zinc-400'>
                Password
            </label>
            <input
            type='password'
            className='w-full mt-1 bg-zinc-800  p-2 text-white outline-1'
            placeholder='password'
            name='password'
            required
            value={values.password}
            onChange={change}
            />
        </div>
        <div className='mt-3'>
            <label htmlFor="" className='text-zinc-400'>
                Address
            </label>
            <textarea
            type='text'
            className='w-full mt-2 bg-zinc-800 text-zinc-100 p-2 outline-1'
            placeholder='address'
            name='address'
            required
            value={values.address}
            onChange={change}
            />
        </div>
        <div className='mt-4'>
            <button onClick={submit} className='w-full cursor-pointer bg-blue-500 text-white py-2 rounded '>
                SignUp
            </button>
        </div>
        <p className='flex mt-4 items-center justify-center text-zinc-200'>
            Or
        </p>
        <p className='flex mt-4 items-center justify-center text-zinc-200'>
            Already have an account? &nbsp;
            <Link to="/login" className='hover:text-blue-500'>
                <u>Login</u>
            </Link>
        </p>
      </div>
      </div>
    </div>
  )
}

export default Signup
