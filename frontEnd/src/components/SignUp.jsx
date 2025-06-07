import React, { useState } from 'react';
import login from '../assets/signup.jpg';
import { Link, useNavigate } from 'react-router-dom';
import AlertBox from './AlertBox';
import axios from "axios";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  const showTempAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 3000);
  };

  const handleSubmit = () => {
    if (firstName === "" || email === "" || password === "" || confirm === "") {
      showTempAlert("Fields can't be empty", "error");
    } 
    else if (role === ""){
      showTempAlert("Select your role", "error");
    }
    else if (password !== confirm) {
      showTempAlert("Passwords do not match", "error");
    }
    else if(password.length < 8){
      showTempAlert("Password should be atleast 8 characters long", "error");
    } 
    else {
      axios.post("http://localhost:3000/user", {firstName, email, password, role}).then(res =>{
        if(res.data === "success"){        
          showTempAlert("Sign Up successful!", "success");
          navigate('/signin');
        }
        else if(res.data === "user found"){
          showTempAlert("User already registered", "error");
        }
        else{
          showTempAlert("Something went wrong", "error");
        }
      })
    }
  };

  return (
    <div className='items-stretch justify-center block w-full min-h-screen p-10 px-10 text-white bg-black lg:flex lg:px-40'>
      {alert.show && (
        <div className="fixed z-50 transform -translate-x-1/2 top-5 left-1/2">
          <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
        </div>
      )}
      <div className='relative w-full lg:w-1/2'>
        <img src={login} alt='Sign In Visual' className='object-cover w-full h-full rounded-none lg:rounded-l-3xl' />
      </div>
      <div className='flex items-center justify-center w-full px-10 bg-white/10 lg:w-1/2 lg:rounded-r-3xl'>
        <div className='w-full'>
          <h2 className='mt-3 mb-3 text-2xl font-bold text-center lg:mt-5'>Create an account</h2>
          <label className='ml-3'>Name:</label>
          <input
            type='text'
            placeholder='Enter Your Name'
            className='w-full px-6 py-3 my-1 text-sm lg:my-2 rounded-2xl bg-white/20'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label className='ml-3'>Email:</label>
          <input
            type='email'
            placeholder='abc@gmail.com'
            className='w-full px-6 py-3 my-1 text-sm lg:my-2 rounded-2xl bg-white/20'
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className='ml-3'>Password:</label>
          <input
            type='password'
            placeholder='Password'
            className='w-full px-6 py-3 my-1 text-sm lg:my-2 rounded-2xl bg-white/20'
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className='ml-3'>Confirm Password:</label>
          <input
            type='password'
            placeholder='Password'
            className='w-full px-6 py-3 my-1 text-sm lg:my-4 rounded-2xl bg-white/20'
            onChange={(e) => setConfirm(e.target.value)}
          />
          <div className=''>
            <label className='block mb-2 ml-1 text-sm font-medium text-white'>Role:</label>
            <select
              className='w-full px-4 py-2 text-sm text-white border border-white bg-black/15 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="" className='text-white bg-black'>Select your role</option>
              <option value="contributor" className='text-white bg-black'>Contributor</option>
              <option value="creator" className='text-white bg-black'>Creator</option>
            </select>
          </div>
          <button className='w-full py-2 my-4 text-white bg-blue-500 rounded-2xl' onClick={handleSubmit}>Continue</button>
          <p className='my-1 text-sm text-center lg:my-3'>Already have an account? <Link to="/signin" className='text-blue-500 underline'>Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
