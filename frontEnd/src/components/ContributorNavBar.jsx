import React, { useState } from 'react'
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CiMenuFries  } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

function ContributorNavBar() {
    const navigate = useNavigate();
    const handleLogOut = (e) =>{
        Cookies.remove('token');
        Cookies.remove('role');
        navigate('/');
    }
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuOpen = () =>{
        setIsMenuOpen(!isMenuOpen);
    }
  return (
    <div>
        <div className='flex items-center justify-between w-full px-10 border-b border-white h-28 bg-white/10'>
            <div className='flex gap-6'>
                <Link to="/contributor-home">   
                    <img src={logo} alt='logo' className='h-20 w-60' />
                </Link>
            </div>
            <div className='text-3xl font-bold' onClick={handleMenuOpen}>{isMenuOpen ? <IoCloseSharp /> : <CiMenuFries />}</div>
        </div>
        <div>
            {isMenuOpen ? 
                <div className='absolute right-0 flex flex-col float-right w-full gap-3 px-10 py-5 font-bold text-black lg:w-auto bg-white/60 z-100 bg-white/10 text-md'>
                    <Link to="/find" className='my-2'>Find Project</Link>
                    <Link to="/profile" className='my-2'>Profile</Link>
                    <Link to="/messages" className='my-2'>Messages</Link>
                    <Link to="/notifications" className='my-2'>Notifications</Link>
                    <Link to="/my-applications" className='my-2'>My Applications</Link>
                    <Link to="/my-projects" className='my-2'>My Projects</Link>
                    <button onClick={handleLogOut} className='px-4 py-2 border border-white bg-white/20 rounded-xl'>
                        <h3>Log Out</h3>
                    </button>
                </div>
                :
                <div></div>
            }
        </div>
    </div>
  )
}

export default ContributorNavBar;