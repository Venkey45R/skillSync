import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ContributorNavBar from './ContributorNavBar';
import { FaRegDotCircle } from 'react-icons/fa';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function MyApplications() {
  const userId = localStorage.getItem('id');
  const [application, setApplication] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);

  useEffect(()=>{
    axios.post('http://localhost:3000/my-application', {userId}).then((res)=>{  
        if(res.data.message === "success"){
            setApplication(res.data.application);
        }
    })
  },[])  

  return (
    <div className='z-50 min-h-screen text-white bg-black'>
      <ContributorNavBar />
      <div className='px-6'>
        <div className='justify-between block pt-10 lg:flex'>
            <h1 className='my-2 text-2xl font-bold'>Your Applications</h1>
        </div>
        <div className='grid-cols-1 grid-cols-3 gap-6 mt-4 lg:grid'>
          {application.length === 0 ? (
            <div>You don't have any application</div>
          ) : (
            application.map((application, index) => (
              <div
                key={application._id}
                className='max-w-md p-4 my-6 text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 flex flex-col min-h-[420px]'
              >
                <p className='flex justify-end gap-1 text-sm'>
                  {application.status}
                </p>
                <h3 className='my-4 text-xl font-bold'>{application.projectName}</h3>
                <p className='mb-4 text-md'>Your Cover Letter: {application.cover}</p>
                <div className='mb-4'>
                    {application.proof !== "" && <div className='flex gap-4'>Your attached proof of work: <a href={`http://${application.proof}`} target='_blank' rel='noopener noreferrer' className='text-blue-500 underline'>Click here</a></div> }
                </div>
                <p className='mb-4 text-sm'>
                  <span className='font-bold'>Sent on: </span>
                  {new Date(application.createdAt).toLocaleDateString('en-GB')}
                </p>
                
                <div className='mb-4'>
                <button onClick={() => setSelectedResume(`http://localhost:3000/${application.resume}`)} className='px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-500'>
                    View Resume
                </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {selectedResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="relative w-[90%] max-w-4xl bg-white rounded-xl overflow-hidden">
            <button
                className="absolute text-xl font-bold text-black top-2 right-2 hover:text-red-500"
                onClick={() => setSelectedResume(null)}
            >
                ×
            </button>
            <iframe
                src={selectedResume}
                title="Resume PDF"
                width="100%"
                height="600px"
                className="w-full"
                onError={() => alert("Failed to load resume. Please check file format or try again.")}
                />
            </div>
        </div>
        )}
      <Footer />
    </div>
  )
}

export default MyApplications;