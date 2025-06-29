import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import CreatorNavBar from './CreatorNavBar';
import creator_hero from '../assets/creator-hero.jpeg';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { GoProjectSymlink } from "react-icons/go";
import { IoMdPeople } from "react-icons/io"
import { MdOutlinePostAdd } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

function CreatorHome() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  
  useEffect(()=>{
    if(Cookies.get('role') !== "creator"){
      navigate('/');
    }
  },[])

  const id = localStorage.getItem('id');
  useEffect(()=>{
    const role = axios.get(`http://localhost:3000/user/${id}`).then((res)=>{
      setUser(res.data);
    })
  },[])
  
  const handleSearch = () =>{
    navigate('/search');
  }
  
  return (
    <div className='z-50 min-h-screen text-white bg-black'>
        <CreatorNavBar />
        <div className=''>
          <div className='flex items-center justify-center py-10'>
            <div className=''>
              <div className='px-4 py-8 my-4 border border-white bg-white/20 rounded-2xl'>
                <div className='justify-center block gap-32 lg:flex '>
                  <div className=''>
                    <h2 className='my-3 text-3xl font-bold'>Welcome, {user.firstName}</h2>
                    <h3 className='text-xl text-center'>Start Managing Your Projects</h3>                  
                  </div>
                  <div>
                    <div className="flex justify-center my-8">
                      <Link to="/create" className='px-4 py-2 text-center border border-white rounded-xl hover:bg-white hover:text-black'>Create new project</Link> 
                    </div>
                  </div>
                </div>
                <div className='flex justify-center px-10 my-4' onClick={handleSearch}>
                  <input type='text' placeholder='Find talents...' className='w-full max-w-md px-3 py-3 bg-white/10 rounded-xl' />
                  <span className='mt-4 -ml-10'><FaSearch /></span>
                </div>
              </div>
              <div className='justify-center block gap-20 my-10 lg:flex'>
                <div className='flex justify-center my-6 lg:my-0'>
                  <Link to="/projects" className="p-4 text-center text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl max-w-80 hover:bg-white/20">
                    <div className="flex justify-center my-2 text-9xl">
                      <GoProjectSymlink />
                    </div>
                    <h1 className='my-2 text-2xl font-bold text-center'>Your Projects</h1>
                    <p className="mb-4 text-xl text-center">See all the live and drafted projects you’ve created</p>
                    <button className='px-4 py-2 border border-white rounded-xl'>See Projects </button>
                  </Link>
                </div>
                <div className='flex justify-center my-6 lg:my-0'>
                  <Link to="/contributors" className="p-4 text-center text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl max-w-80 hover:bg-white/20">
                    <div className="flex justify-center my-2 text-9xl">
                      <IoMdPeople />
                    </div>
                    <h1 className='my-2 text-2xl font-bold text-center'>Your Contributors</h1>
                    <p className="mb-4 text-xl text-center">Check who’s actively contributing to your projects</p>
                    <button className='px-4 py-2 border border-white rounded-xl'>See Contributors</button>
                  </Link>
                </div>
                <div className='flex justify-center my-6 lg:my-0'>
                  <Link to="/applications" className="p-4 text-center text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl max-w-80 hover:bg-white/20">
                    <div className="flex justify-center my-2 text-9xl">
                      <MdOutlinePostAdd />
                    </div>
                    <h1 className='my-2 text-2xl font-bold text-center'>Your Applications</h1>
                    <p className="mb-4 text-xl text-center">Review the applicants who wants to contribute</p>
                    <button className='px-4 py-2 border border-white rounded-xl'>See Applicants</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default CreatorHome;