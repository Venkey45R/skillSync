import React from 'react';
import login from '../assets/signin.jpg';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import AlertBox from './AlertBox';
import axios from "axios";
import { useState } from 'react';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  const showTempAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 3000);
  };

  const handleSubmit = () =>{
    axios.post('http://localhost:3000/signin', {email, password}).then((res) =>{
      if(res.data.message === "success"){
        localStorage.setItem("token", res.data.token);
        showTempAlert("Login successful", "success");
        navigate('/home');
      }
      else{
        if(res.data === "user not found"){
          showTempAlert("User not found", "error");
        }
        else if(res.data === "password incorrect"){
          showTempAlert("Password incorrect", "error");
        }
        else{
          showTempAlert("Something went wrong", "error");
        }
      }
    })
  }

  return (
    <div className='items-stretch justify-center block w-full min-h-screen p-10 px-10 text-white bg-black lg:flex lg:px-40'>
      {alert.show && (
        <div className="fixed z-50 transform -translate-x-1/2 top-5 left-1/2">
          <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
        </div>
      )}
      <div className='flex items-center justify-center w-full p-10 bg-white/10 lg:w-1/2 lg:rounded-l-3xl'>
        <div className='w-full'>
          <h2 className='mt-3 mb-3 text-xl font-bold text-center lg:mt-5 lg:text-2xl'>Welcome to Skill Sync</h2>
          <div className='flex justify-center my-8'>
            <button className='flex gap-4 px-2 py-3 text-center text-white lg:px-8 bg-white/20 rounded-xl'>
              <FaGoogle className='mt-1' />
              Sign in with Google
            </button>
          </div>
          <p className='my-4 text-center lg:my-10'>---------- or ----------</p>
          <p className='mb-6 text-center'>Enter your credentials to access your account</p>
          <input
            type='email'
            placeholder='abc@gmail.com'
            className='w-full px-6 py-3 my-2 text-sm rounded-2xl bg-white/20'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            className='w-full px-6 py-3 my-4 text-sm rounded-2xl bg-white/20'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='w-full py-2 my-2 text-white bg-blue-500 lg:my-4 rounded-2xl' onClick={handleSubmit}>Continue</button>
          <p className='my-3 text-sm text-center'>Don't have an account? <Link to="/signup" className='text-blue-500 underline'>Sign up</Link></p>
        </div>
      </div>
      <div className='relative w-full lg:w-1/2'>
        <img src={login} alt='Sign In Visual' className='object-cover w-full h-full rounded-none lg:rounded-r-3xl' />
      </div>
    </div>
  );
}

export default SignIn;
