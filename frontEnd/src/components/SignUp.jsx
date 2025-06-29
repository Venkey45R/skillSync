import React, { useEffect, useState } from 'react';
import login from '../assets/signup.jpg';
import { Link, useNavigate } from 'react-router-dom';
import AlertBox from './AlertBox';
import axios from "axios";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });
  const navigate = useNavigate();

  useEffect(()=>{
    if(Cookies.get('role') === "creator"){
      navigate('/creator-home');
    }
    else if(Cookies.get('role') === "contributor"){
      navigate('/contributor-home');
    }
  },[])

  const showTempAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 2000);
  };

  const handleSubmit = () => {
    if (firstName === "" || email === "" || password === "" || confirm === "") {
      showTempAlert("Fields can't be empty", "error");
    }
    else if (password !== confirm) {
      showTempAlert("Passwords do not match", "error");
    }
    else if(password.length < 8){
      showTempAlert("Password should be atleast 8 characters long", "error");
    } 
    else if(!email.includes('@')){
      showTempAlert("Email invalid", "error");
    }
    else {
      axios.post("http://localhost:3000/signup", {firstName, email, password}).then(res =>{
        if(res.data.message === "success"){        
          showTempAlert("Sign Up successful!", "success");
          localStorage.setItem('id', res.data.id);          
          Cookies.set('token', res.data.token, {expires: 7});
          Cookies.set('role', res.data.role);
          navigate('/details', {state: res.data.id});
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

  const handleGoogleSuccess = (credential) =>{
    const email = credential.email;
    const firstName = credential.name;
    axios.post('http://localhost:3000/google', {email, firstName}).then((res)=>{
      if(res.data.message === "success"){
        localStorage.setItem('id', res.data.id);
        Cookies.set('token', res.data.token, {expires: 7});
        Cookies.set('role', res.data.role);
        if(res.data.isOnBoarded === false){
          navigate('/details', {state: res.data.id});
        }
        else{
          if(Cookies.get('role') === "creator"){
            navigate('/creator-home', {state: res.data.id});
          }
          else if(Cookies.get('role') === "contributor"){
            navigate('/contributor-home');
          }
        }
      }
      else{
        showTempAlert("something went wrong", "error");
        navigate('/signup');
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
      <div className='relative w-full lg:w-1/2'>
        <img src={login} alt='Sign In Visual' className='object-cover w-full h-full rounded-none lg:rounded-l-3xl' />
      </div>
      <div className='flex items-center justify-center w-full px-10 bg-white/10 lg:w-1/2 lg:rounded-r-3xl'>
        <div className='w-full'>
          <h2 className='mt-3 mb-3 text-2xl font-bold text-center lg:mb-5 lg:mt-5'>Create an account</h2>
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
            className='w-full px-6 py-3 my-1 text-sm lg:my-2 rounded-2xl bg-white/20'
            onChange={(e) => setConfirm(e.target.value)}
          />
          <button className='w-full py-2 my-6 text-white bg-blue-500 rounded-2xl' onClick={handleSubmit}>Continue</button>
          <p className='my-4 text-center lg:my-2'>---------- or ----------</p>
          <div className='flex justify-center my-4'>
            <GoogleLogin onSuccess={(credentialResponse) => {
              handleGoogleSuccess(jwtDecode(credentialResponse.credential));
            }} onError={() => alert("Google login failed")} auto_select={true}  type='icon' shape='circle' theme='filled_black' text='signin'/> 
          </div>
          <p className='my-1 mb-4 text-sm text-center lg:my-3'>Already have an account? <Link to="/signin" className='text-blue-500 underline'>Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
