import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authActions } from '../../store/auth';
import { useDispatch } from 'react-redux';
const Login = () => {
     const [values,setValues] = useState({
            userName:"",  
            password: "",
          
        })
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const change = (e) => {
            const {name, value} = e.target;
            setValues({...values,[name]:value})
        }
    
        const submit = async () => {
            try {
                if(values.userName === "" || values.password === ""){
                    alert("All fields are required")
                }else{
             console.log(values)
            const response = await axios.post("/api/v1/sign-in",values);
            dispatch(authActions.login());        
            dispatch(authActions.changeRole(response.data.user));        

            localStorage.setItem("id",response.data.id);
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("role",response.data.role);
            navigate("/")       

        }
            } catch (error) {
                console.log(error.response.data.message)
            }
        }
  return (
    <div className=' bg-zinc-900 px-12 h-screen -8 flex items-center justify-center'>
      <div className='bg-zinc-800  rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6'>
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
            placeholder='userName'
            name='userName'
            required
            value={values.userName}
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
       
        </div>
        <div className='mt-4'>
            <button onClick={submit} className=' cursor-password w-full bg-blue-500 text-white py-2 rounded '>
                Login
            </button>
        </div>
        <p className='flex mt-4 items-center justify-center text-zinc-200'>
            Or
        </p>
        <p className='flex mt-4 items-center justify-center text-zinc-200'>
            Don't have an account? &nbsp;
            <Link to="/login" className='hover:text-blue-500'>
                <u>Sign Up</u>
            </Link>
        </p>
      </div>
      </div>
  )
}

export default Login
