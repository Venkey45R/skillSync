import React, { useState } from 'react'
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Cookies from 'js-cookie';
import details_bg from '../assets/details.mp4';
import Footer from './Footer';
import AlertBox from './AlertBox';
import axios from 'axios';

function Details() {
  const locations = useLocation();
  const navigate = useNavigate();
  const id = locations.state || '';
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedIn] = useState("");
  const [github, setGithub] = useState("");
  const [bio, setBio] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "", type: "success" });

  const showTempAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 2000);
  };

  const handleSubmit = (e) =>{
    if(role === "" || phone === "" || location === "" || bio === ""){
      showTempAlert("Enter all necessary fields", "error");
    }
    else{
      axios.post('http://localhost:3000/onBoard', {id, role, phone, location, linkedin, github, bio}).then((res)=>{
        if(res.data.message === "success"){
          Cookies.set("role", role, {expires: 7});
          if(role === "contributor"){
            navigate('/role-specific', {state: role});
          }
          else{
            navigate('/creator-details', {state: role});
          }
        }
      })
    }
  } 

  return (
    <div className='relative min-h-screen'>
      <video autoPlay muted loop playsInline className=' inset-0 w-full fixed min-h-screen object-cover z-[-1]'>
        <source src={details_bg} type='video/mp4' />
      </video>
      <div className='relative z-10 text-white'>
        {alert.show && (
          <div className="fixed z-50 transform -translate-x-1/2 top-5 left-1/2">
            <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
          </div>
        )}
        <div className='flex justify-between px-8 py-6 border-b border-white lg:px-20'>
          <div>
            <h1 className='text-2xl font-bold text-white lg:text-3xl font-rubik'>Skill Sync</h1>
          </div>
          <div>
            <p className='mt-2 text-sm lg:text-base'>Idea Meets Execution!</p>
          </div>
        </div>
        <div className='flex items-center justify-center p-5'>
          <div className="px-6 py-8 border-2 shadow-lg border-white/20 bg-white/10 rounded-3xl backdrop-blur-md">
            <h3 className="mb-6 text-3xl font-semibold text-center text-white">
              Let us know about you
            </h3>
            <div className="mb-3">
              <label className="block mb-3 text-sm font-medium text-white">
                What brings you to SkillSync?
              </label>
              <select className="w-full px-4 py-3 text-white bg-black rounded-xl placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm" onChange={(e) => setRole(e.target.value)}>
                <option className="text-white bg-black" value="">
                  Select your role
                </option>
                <option className="text-white bg-black" value="creator">
                  Find the right talent for the project and manage collaboration
                </option>
                <option className="text-white bg-black" value="contributor">
                  Discover meaningful projects to apply my skills
                </option>
              </select>
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-white">
                Phone number
              </label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-white">
                Location 
              </label>
              <input
                type="text"
                placeholder="Enter your location"
                className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-white">
                LinkedIn profile <span className="text-sm text-white/60">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="Enter your profile link"
                className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-white">
                Github profile <span className="text-sm text-white/60">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="Enter your profile link"
                className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"
                onChange={(e) => setGithub(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="block mb-2 text-sm font-medium text-white">
                Tell us about your self
              </label>
              <textarea rows="3" placeholder='A small intro about yourself...' onChange={(e) => setBio(e.target.value)} className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"></textarea>
            </div>
            <button className='w-full py-2 bg-blue-500 border border-white rounded-xl' onClick={handleSubmit}>Continue</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Details