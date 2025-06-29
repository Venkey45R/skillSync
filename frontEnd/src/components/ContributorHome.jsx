import React, { useEffect, useState } from 'react'
import Footer from './Footer';
import ContributorNavBar from './ContributorNavBar';
import { Link, useNavigate } from 'react-router-dom';
import Contributor_hero from '../assets/contributor_hero.webp';
import Cookies from 'js-cookie';
import { GoProjectSymlink } from "react-icons/go";
import { SiGoogletasks } from "react-icons/si";
import { LuMailQuestion } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';

function ContributorHome() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    if(Cookies.get('role') !== "contributor"){
      navigate('/');
    }
  },[])

  const [user, setUser] = useState({});

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
        <ContributorNavBar />
        <div className=''>
          <div className='flex items-center justify-center py-10'>
            <div className=''>
              <div className='px-4 py-8 my-4 border border-white bg-white/20 rounded-2xl'>
                <div className='justify-center block gap-32 lg:flex '>
                  <div className=''>
                    <h2 className='my-3 text-3xl font-bold'>Welcome, {user.firstName}</h2>
                    <h3 className='text-xl text-center'>Find real time Projects to contribute</h3>                  
                  </div>
                  <div>
                    <div className="flex justify-center my-8">
                      <Link to="/find" className='px-4 py-2 text-center border border-white rounded-xl hover:bg-white hover:text-black'>Join a project</Link> 
                    </div>
                  </div>
                </div>
                <div className='flex justify-center px-10 my-4' onClick={handleSearch}>
                  <input type='text' placeholder='Find projects...' className='w-full max-w-md px-3 py-3 bg-white/10 rounded-xl' />
                  <span className='mt-4 -ml-10'><FaSearch /></span>
                </div>
              </div>
              <div className='justify-center block gap-20 my-10 lg:flex'>
                <div className='flex justify-center my-6 lg:my-0'>
                  <Link to="/my-projects" className="p-4 text-center text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl max-w-80 hover:bg-white/20">
                    <div className="flex justify-center my-2 text-9xl">
                      <GoProjectSymlink />
                    </div>
                    <h1 className='my-2 text-2xl font-bold text-center'>Joined Projects</h1>
                    <p className="mb-4 text-xl text-center">View all the projects you’re currently contributing to</p>
                    <button className='px-4 py-2 border border-white rounded-xl'>See Projects </button>
                  </Link>
                </div>
                <div className='flex justify-center my-6 lg:my-0'>
                  <Link to="/tasks" className="p-4 text-center text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl max-w-80 hover:bg-white/20">
                    <div className="flex justify-center my-2 text-9xl">
                      <SiGoogletasks />
                    </div>
                    <h1 className='my-2 text-2xl font-bold text-center'>Your Tasks</h1>
                    <p className="mb-4 text-xl text-center">Track all the tasks assigned to you across different projects</p>
                    <button className='px-4 py-2 border border-white rounded-xl'>View tasks</button>
                  </Link>
                </div>
                <div className='flex justify-center my-6 lg:my-0'>
                  <Link to="/my-applications" className="p-4 text-center text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl max-w-80 hover:bg-white/20">
                    <div className="flex justify-center my-2 text-9xl">
                      <LuMailQuestion />
                    </div>
                    <h1 className='my-2 text-2xl font-bold text-center'>View Application</h1>
                    <p className="mb-4 text-xl text-center">Monitor the status of your pending project applications</p>
                    <button className='px-4 py-2 border border-white rounded-xl'>See Applications</button>
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

export default ContributorHome;


