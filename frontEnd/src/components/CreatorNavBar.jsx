import React, { useState } from 'react'
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { CiMenuFries  } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";

function NavBar() {
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
        <div className='flex items-center justify-between w-full px-10 text-white border-b border-white h-28 bg-white/10'>
            <div className='flex gap-6'>
                <Link to="/creator-home">   
                    <img src={logo} alt='logo' className='h-20 w-60' />
                </Link>
            </div>
            <div className='text-3xl font-bold' onClick={handleMenuOpen}>{isMenuOpen ? <IoCloseSharp /> : <CiMenuFries />}</div>
        </div>
        <div>
            {isMenuOpen ? 
                <div className='absolute right-0 flex flex-col float-right w-full gap-3 px-10 py-5 font-bold text-black lg:w-auto bg-white/60 z-100 text-md'>
                    <Link to="/creator-home" className='my-2'>Home</Link> 
                    <Link to="/applications" className='my-2'>Applications</Link>
                    <Link to="/messages" className='my-2'>Messages</Link>
                    <Link to="/profile" className='my-2'>Profile</Link>
                    <Link to="/projects" className='my-2'>Projects</Link>
                    <Link to="/notifications" className='my-2'>Notifications</Link>
                    <button className='px-4 py-2 border border-white bg-white/20 rounded-xl'>
                        <Link to="/create">Post a Project</Link>
                    </button>
                    <button onClick={handleLogOut} className='px-4 py-2 my-2 border border-white bg-white/20 rounded-xl'>
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

export default NavBar;