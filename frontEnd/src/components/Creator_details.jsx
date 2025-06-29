import React, {useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import details_bg from '../assets/details.mp4';
import Footer from './Footer';
import AlertBox from './AlertBox';
import axios from 'axios';
import confetti from 'canvas-confetti';
import Cookies from 'js-cookie';

function Creator_details() {
    const location = useLocation();
    const id = localStorage.getItem('id');
    const role = location.state;
    const navigate = useNavigate(); 
    const [alert, setAlert] = useState({ show: false, message: "", type: "success" });
    const showTempAlert = (message, type = "success") => {
        setAlert({ show: true, message, type });
        setTimeout(() => {
            setAlert({ ...alert, show: false });
        }, 2000);
    };
    if(role !== 'creator'){
        navigate('/');
    }

    const [company, setCompany] = useState("");
    const [bio, setBio] = useState("");
    const [locations, setLocations] = useState("");
    const [contact, setContact] = useState("");
    
    const handleSubmit = () =>{
        if(company === "" || bio === "" || locations === ""){
            showTempAlert("Enter necessary fields", "error");
        }
        else{
            if(!id){
                showTempAlert("something went wrong, try signing in again", "error");
                navigate('/signin');
            }
            else{
                axios.post('http://localhost:3000/company', {id, company, bio, locations, contact}).then((res)=>{
                    if(res.data === "success"){
                        confetti({
                            particleCount: 500,
                            spread: 90
                        })
                        Cookies.set('role', "creator");
                        showTempAlert("OnBoarding success", "success");
                        setTimeout(()=>{
                            navigate('/creator-home');
                        }, 2000);
                    }
                    else{
                        showTempAlert("something went wrong", "error");
                        navigate('/signin');
                    }
                })
            }
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
      </div>
      <div className='flex justify-between px-8 py-6 border-b border-white lg:px-20'>
        <div><h1 className='text-2xl font-bold text-white lg:text-3xl font-rubik'>Skill Sync</h1></div>
        <div>
          <p className='mt-2 text-sm lg:text-base'>Idea Meets Execution!</p>
        </div>
      </div>
      <div className='flex items-center justify-center p-5'>
        <div className="px-6 py-8 border-2 shadow-lg min-w-80 lg:min-w-md border-white/20 bg-white/10 rounded-3xl backdrop-blur-md">
            <h3 className="mb-6 text-3xl font-semibold text-center text-white">Let us know about you</h3>
            <div className="mb-3">
                <label className="block mb-3 text-sm font-medium text-white">
                    Company/Agency name:
                </label>
                <input type="text" onChange={(e) => setCompany(e.target.value)} className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm" />
            </div>
            <div className="mb-3">
                <label className="block mb-3 text-sm font-medium text-white">
                    Company Bio:
                </label>
                <textarea rows={3} placeholder='explain about the projects and keep it simple...' onChange={(e) => setBio(e.target.value)} className='w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm' />
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-white">
                    Company Location
                </label>
                <input type="text" placeholder="Enter your company's location" onChange={(e) => setLocations(e.target.value)} className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm" />
            </div>
            <div className="mb-3">
                <label className="block mb-2 text-sm font-medium text-white">
                    Company Email/Social Media <span>(if any)</span>
                </label>
                <input type="text" placeholder="Enter your company's contact info" onChange={(e) => setContact(e.target.value)} className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm" />
            </div>
            <button className='w-full py-2 bg-blue-500 border border-white rounded-xl' onClick={handleSubmit}>Submit</button>
        </div>
        </div>
        <Footer />
    </div>
  )
}

export default Creator_details;