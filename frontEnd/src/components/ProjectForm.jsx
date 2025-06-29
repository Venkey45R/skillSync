import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import CreatorNavBar from './ContributorNavBar';
import { Link } from 'react-router-dom';
import AlertBox from './AlertBox';
import axios from "axios";
import { useState } from 'react';
import Footer from './Footer';
import Select from 'react-select';

function ProjectForm() {
    const [title, setTitle] = useState("");
    const [descrption, setDescrption] = useState("");
    const [tags, setTags] = useState([]);
    const [contributorRequired, setContributorRequired] = useState(0);
    const [expectedDuration, setExpectedDuration] = useState("");
    const [guidelines, setGuidelines] = useState("");
    const [alert, setAlert] = useState({ show: false, message: "", type: "success" });
    const [id, setId] = useState();

    useEffect(()=>{
      setId(localStorage.getItem('id'));
    },[])
    const navigate = useNavigate();

    const showTempAlert = (message, type = "success") => {
      setAlert({ show: true, message, type });
      setTimeout(() => {
        setAlert({ ...alert, show: false });
      }, 2000);
    };

  if(Cookies.get('role') !== "creator"){
    navigate('/');
  }

    const skills = [
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "react", label: "React" },
    { value: "nextjs", label: "Next.js" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue.js" },
    { value: "nodejs", label: "Node.js" },
    { value: "express", label: "Express.js" },
    { value: "mongodb", label: "MongoDB" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "firebase", label: "Firebase" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
    { value: "csharp", label: "C#" },
    { value: "golang", label: "Go" },
    { value: "springboot", label: "Spring Boot" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
    { value: "graphql", label: "GraphQL" },
    { value: "restapi", label: "REST API" },
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
    { value: "docker", label: "Docker" },
    { value: "kubernetes", label: "Kubernetes" },
    { value: "git", label: "Git" },
    { value: "github", label: "GitHub" },
    { value: "figma", label: "Figma" },
    { value: "uiux", label: "UI/UX Design" },
    { value: "tailwind", label: "Tailwind CSS" },
    { value: "bootstrap", label: "Bootstrap" },
    { value: "problemSolving", label: "Problem Solving" },
    { value: "dataStructures", label: "Data Structures" },
    { value: "algorithms", label: "Algorithms" },
    { value: "teamwork", label: "Teamwork" },
    { value: "communication", label: "Communication" }
  ];
  
  const handleChange = (tag) =>{
    setTags(tag);
  }

  const handleSubmit = () =>{
    if(title === "" || descrption === "" || contributorRequired <= 0 || guidelines === ""){
      showTempAlert("Enter all necessary fields to continue", "error");
    }
    else{
      axios.post('http://localhost:3000/projects', {id, title, descrption, tags, contributorRequired, expectedDuration, guidelines}).then((res)=>{
        if(res.data.message === "success"){
          showTempAlert("Project added succesfully", "success");
          setTimeout(() => {
            navigate('/creator-home');
          }, 2000);
        }
        else{
          showTempAlert("Something went wrong");
        }
      })
    }
  }
  return (
    <div className='min-h-screen text-white bg-black'>
      <CreatorNavBar />
      <div className='items-stretch justify-center block w-full min-h-screen p-10 px-10 text-white bg-black lg:flex lg:px-40'>
        {alert.show && (
          <div className="fixed z-50 transform -translate-x-1/2 top-5 left-1/2">
            <AlertBox type={alert.type} message={alert.message} onClose={() => setAlert({ ...alert, show: false })} />
          </div>
        )}
        <div className='flex items-center justify-center w-full p-10 bg-white/10 lg:w-1/2 lg:rounded-3xl'>
          <div className='block'>
            <h1 className='mb-6 text-2xl font-bold text-center'>Project Details</h1>
            <label className='ml-3'>Project Title:</label>
            <input
              type='text'
              placeholder='Give the title'
              className='w-full px-6 py-3 my-2 mb-4 text-sm rounded-2xl bg-white/20'
              onChange={(e) => setTitle(e.target.value)}
            />
            <label className="ml-3">Descrption</label>
            <textarea rows={5} cols={2} placeholder='Explain about the project' className='w-full px-6 py-3 my-2 mb-4 text-sm rounded-2xl bg-white/20' onChange={(e) => setDescrption(e.target.value)}></textarea>
            <label className='ml-3'>Tech Stack needed:</label>
            <div className="mt-2 mb-4 text-black bg-black rounded-xl">
              <Select options={skills} value={tags} onChange={handleChange} isMulti={true} />
            </div>
            <label className='ml-3'>Contributors Needed:</label>
            <input
              type='text'
              placeholder='Number of contributors needed'
              className='w-full px-6 py-3 my-2 mb-4 text-sm rounded-2xl bg-white/20'
              onChange={(e) => setContributorRequired(e.target.value)}
            />
            <label className='ml-3'>Expected Duration: (in weeks)</label>
            <input
              type='text'
              placeholder='Give expected duration'
              className='w-full px-6 py-3 my-2 mb-4 text-sm rounded-2xl bg-white/20'
              onChange={(e) => setExpectedDuration(e.target.value)}
            />
            <label className='ml-3'>What are your expected guidelines:</label>
            <textarea rows={5} cols={2} placeholder='Explain your expectations from contributors' className='w-full px-6 py-3 my-2 mb-4 text-sm rounded-2xl bg-white/20' onChange={(e) => setGuidelines(e.target.value)}></textarea>
            <button className='w-full py-2 bg-blue-500 border border-white rounded-xl' onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ProjectForm;