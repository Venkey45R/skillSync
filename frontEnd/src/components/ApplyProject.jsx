import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AlertBox from './AlertBox';
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import axios from 'axios';
import confetti from 'canvas-confetti';

function ApplyProject() {
    const location = useLocation();
    const project = location.state;
    const projectId = project._id;
    const projectName = project.title;
    const creatorId = project.creatorId;
    const [alert, setAlert] = useState({ show: false, message: "", type: "success" });
    const [cover, setCover] = useState("");
    const [proof, setProof] = useState("");
    const [time, setTime] = useState("");
    const [resume, setResume] = useState({});
    const [userId, setUserId] = useState("");
    const [applied, setApplied] = useState(false);
    const [received, setReceived] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{
      setUserId(localStorage.getItem('id'));
    },[])

    useEffect(()=>{
      if(userId){
        axios.post('http://localhost:3000/allow-application', {projectId, userId}).then((res) =>{
          if(res.data.message === "already applied"){
            setApplied(true);
          }
        })
      }
    },[userId])

    const showTempAlert = (message, type = "success") => {
      setAlert({ show: true, message, type });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 2000);
    };

    const handleFile = (e) =>{
      const file = e.target.files[0];
      if(file){
        setResume(file);
        setReceived(true);
      }
    };

    const handleSubmit = () =>{
      if(cover === ""){
        showTempAlert("Add Cover letter to continue", "error");
      }
      else if(time === ""){
        showTempAlert("Give your expected time to work", "error");
      }
      else if(isNaN(time)){
        showTempAlert("Give only numbers in expected time to work", "error");
      }
      else if(cover.length < 100){
        showTempAlert("Cover letter should be atleast 100 characters", "error");
      }
      else if(cover.length > 500){
        showTempAlert("Cover letter should be atmost 500 characters", "error");
      }
      else{
        const formData = new FormData();
        formData.append("cover", cover);
        formData.append("proof", proof);
        formData.append("time", time);
        formData.append("projectId", projectId);
        formData.append("userId", userId);
        formData.append("projectName", projectName);
        formData.append("creatorId", creatorId);
        formData.append("resume", resume);
        axios.post('http://localhost:3000/application', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }).then((res) =>{
          if(res.data.message === "success"){
            confetti({
              particleCount: 500,
              spread: 90
            })
            showTempAlert("Application sent succesfully", "success");
            setTimeout(() => {
              navigate('/find');
            }, 3000);
          }
          else{
            showTempAlert("Something went wrong", "error");
          }
        })
      }
    }

    return (
      <div>
        <div className='items-stretch justify-center block w-full min-h-screen p-10 px-5 text-white bg-black lg:flex lg:px-40'>
        {alert.show && (
          <div className="fixed z-50 transform -translate-x-1/2 top-5 left-1/2">
            <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
          </div>
        )}
        {!applied ? 
        <div className='flex items-center justify-center w-full px-5 lg:px-10 bg-white/10 lg:w-1/2 rounded-3xl'>
          <div className='w-full'>
            <h2 className='mt-3 mb-3 text-2xl font-bold text-center lg:mb-5 lg:mt-5'>Application form</h2>
            <label className='mb-1 ml-3'>Cover Letter: (100 - 250 characters)</label>
            <textarea rows="8" placeholder='Show why you are intrest in this project' onChange={(e) => setCover(e.target.value)} className="w-full px-4 py-3 mt-2 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"></textarea>
            <label className='my-1 ml-3'>Portfolio / sample works: </label>
            <input
              type='text'
              placeholder='Give some proof of work'
              className='w-full px-6 py-3 my-1 text-sm lg:my-2 rounded-2xl bg-white/20'
              onChange={(e) => setProof(e.target.value)}
            />
            <label className='my-1 ml-3'>Expected time to work (hours per week):</label>
            <input
              type='text'
              placeholder='Give the time you can allocate for this project'
              className='w-full px-6 py-3 my-1 text-sm lg:my-2 rounded-2xl bg-white/20'
              onChange={(e) => setTime(e.target.value)}
            />
            <div className='block'>
              <label className='ml-3'>Resume:</label>
              <br />
              <input type="file" onChange={handleFile} name='resume' className="hidden" id="resumeUpload" accept=".pdf,.doc,.docx" />
              <div className='flex mt-1 ml-1 lg:mt-0'>
                <label htmlFor="resumeUpload" className="flex px-6 py-2 text-sm hover:bg-white/30 lg:my-2 rounded-xl bg-white/20">
                  {!received ? <div className='flex'><p>Upload Resume</p> <MdOutlineDriveFolderUpload className='ml-3 text-xl font-semibold'/></div> :<div>Update</div>}
                </label>
              </div>
            </div>
            <button className='w-full py-2 my-6 text-white bg-blue-500 rounded-2xl' onClick={handleSubmit}>Continue</button>
          </div>
        </div>
        : 
        <div className='text-white bg-black'>
          <div className='flex items-center justify-center mt-6'>
            <div className='p-10 bg-white/10 rounded-2xl'>
              <h2 className='text-xl font-semibold'>You Have already applied to this project</h2>
              <div className='flex justify-center mt-6 mb-2'>
                <div className='flex gap-10'>
                  <Link to='/find' className='px-4 py-2 border border-white rounded-xl hover:bg-white hover:text-black'>Find other projects</Link>
                  <Link to='/my-applications' className='px-4 py-2 border border-white rounded-xl hover:bg-white hover:text-black'>See applications</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      </div>
    </div>
  )
}

export default ApplyProject;