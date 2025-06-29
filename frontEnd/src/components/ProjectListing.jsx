// Updated ProjectListing Component with better filters and UI
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaRegDotCircle, FaSearch } from 'react-icons/fa';
import { MdFilterListAlt } from 'react-icons/md';
import ContributorNavBar from './ContributorNavBar';
import Footer from './Footer';
import ApplyProject from './ApplyProject';

function ProjectListing() {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [isFilters, setIsFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    tech: [],
    duration: [],
    contributorsRequired: [],
    applications: [],
    postedIn: []
  });

  useEffect(() => {
    if (Cookies.get('role') !== "contributor") navigate('/');
    setId(localStorage.getItem('id'));
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.post('http://localhost:3000/get-allprojects', {}).then(res => {
        setProjects(res.data.projects);
        setFilteredProjects(res.data.projects);
        setLoading(false);
      });
    }
  }, [id]);

  useEffect(() => {
    const temp = projects.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    setFilteredProjects(temp);
  }, [search]);

  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const updated = prev[category].includes(value)
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updated };
    });
  };

  const applyFilters = () => {
    let temp = [...projects];

    if (filters.status.length > 0) {
      temp = temp.filter(p => filters.status.includes(p.status));
    }

    if (filters.tech.length > 0) {
      temp = temp.filter(p =>
        p.tags && filters.tech.some(stack => p.tags.includes(stack.toLowerCase()))
      );
    }

    if (filters.duration.length > 0) {
      temp = temp.filter(p => {
        const dur = parseInt(p.expectedDuration);
        return filters.duration.some(filter => {
          if (filter === '< 2 weeks') return dur < 2;
          if (filter === '< 6 weeks') return dur < 6;
          if (filter === '> 8 weeks') return dur > 8 || dur === 8;
          return false;
        });
      });
    }

    if (filters.contributorsRequired.length > 0) {
      temp = temp.filter(p => {
        const required = p.contributorsRequired - (p.contributors?.length || 0);
        return filters.contributorsRequired.some(filter => {
          if (filter === '< 4') return required < 4;
          if (filter === '< 8') return required < 8;
          if (filter === '> 8') return required > 8 || required === 8;
          return false;
        });
      });
    }

    if (filters.applications.length > 0) {
      temp = temp.filter(p => {
        const apps = p.pendingRequests?.length || 0;
        return filters.applications.some(filter => {
          if (filter === '< 5') return apps < 5;
          if (filter === '< 10') return apps < 10;
          if (filter === '> 25') return apps > 25;
          return false;
        });
      });
    }

    if (filters.postedIn.length > 0) {
      temp = temp.filter(p => {
        const postedDate = new Date(p.createdAt);
        const now = new Date();
        const diff = (now - postedDate) / (1000 * 60 * 60 * 24);
        return filters.postedIn.some(filter => {
          if (filter === 'Last 24 hours') return diff <= 1;
          if (filter === 'Last 3 days') return diff <= 3;
          if (filter === 'Last 7 days') return diff <= 7;
          return false;
        });
      });
    }

    temp = temp.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    setFilteredProjects(temp);
  };

  const handleApply = (project) =>{
    navigate('/apply', {state: project});
  }

  return (
    <div className='z-50 min-h-screen text-white bg-black'>
      <ContributorNavBar />
      {loading && <div className='text-center text-white'>Loading...</div>}

      <div className='px-6'>
        <div className='justify-between block pt-10 pb-4 lg:flex'>
          <h1 className='my-2 mb-6 text-2xl font-bold'>Available Projects</h1>
          <div className='flex gap-6 lg:gap-12'>
            <div className='flex'>
              <input
                type='text'
                placeholder='search...'
                className='h-10 px-3 py-1 border border-white w-60 rounded-xl bg-white/10'
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <FaSearch className='mt-3 -ml-8' />
            </div>
            <div
              className='flex h-10 px-3 py-1 border border-white cursor-pointer rounded-xl bg-white/10'
              onClick={() => setIsFilters(!isFilters)}
            >
              <p className='mt-1'>Filters</p>
              <MdFilterListAlt className='mt-2 ml-2' />
            </div>
          </div>
        </div>

        {isFilters && (
          <div className='flex flex-col w-full gap-3 px-10 py-5 mx-auto font-bold max-w-7xl bg-white/10 rounded-xl'>
            <h3 className='text-xl font-semibold text-[#00ffc3]'>Project Status</h3>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
              <label><input type='checkbox' onChange={() => handleFilterChange('status', 'live')} /> Live</label>
              <label><input type='checkbox' onChange={() => handleFilterChange('status', 'completed')} /> Completed</label>
            </div>

            <h3 className='text-xl font-semibold text-[#00ffc3] mt-4'>Tech Stack</h3>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-4'>
              {['react', 'node js', 'html', 'javascript', 'angular', 'python', 'next js', 'mysql', 'firebase'].map(tech => (
                <label key={tech}><input type='checkbox' onChange={() => handleFilterChange('tech', tech)} /> {tech}</label>
              ))}
            </div>

            <h3 className='text-xl font-semibold text-[#00ffc3] mt-4'>Duration</h3>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
              <label><input type='checkbox' onChange={() => handleFilterChange('duration', '< 2 weeks')} /> Less than 2 weeks</label>
              <label><input type='checkbox' onChange={() => handleFilterChange('duration', '< 6 weeks')} /> Less than 6 weeks</label>
              <label><input type='checkbox' onChange={() => handleFilterChange('duration', '> 8 weeks')} /> More than 8 weeks</label>
            </div>

            <h3 className='text-xl font-semibold text-[#00ffc3] mt-4'>Contributors Required</h3>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
              <label><input type='checkbox' onChange={() => handleFilterChange('contributorsRequired', '< 4')} /> Less than 4</label>
              <label><input type='checkbox' onChange={() => handleFilterChange('contributorsRequired', '< 8')} /> Less than 8</label>
              <label><input type='checkbox' onChange={() => handleFilterChange('contributorsRequired', '> 8')} /> More than 8</label>
            </div>

            <h3 className='text-xl font-semibold text-[#00ffc3] mt-4'>Applications</h3>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
              <label><input type='checkbox' onChange={() => handleFilterChange('applications', '< 5')} /> Less than 5</label>
              <label><input type='checkbox' onChange={() => handleFilterChange('applications', '< 10')} /> Less than 10</label>
              <label><input type='checkbox' onChange={() => handleFilterChange('applications', '> 25')} /> More than 25</label>
            </div>

            <h3 className='text-xl font-semibold text-[#00ffc3] mt-4'>Posted In</h3>
            <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
              <label><input type='checkbox' onChange={() => handleFilterChange('postedIn', 'Last 24 hours')} /> Last 24 hours</label>
              <label><input type='checkbox' onChange={() => handleFilterChange('postedIn', 'Last 3 days')} /> Last 3 days</label>
              <label><input type='checkbox' onChange={() => handleFilterChange('postedIn', 'Last 7 days')} /> Last 7 days</label>
            </div>

            <div className='flex justify-center mt-6'>
              <button className='px-6 py-2 rounded-xl bg-[#00ffc3]/20 border border-[#00ffc3] cursor-pointer' onClick={applyFilters}>Apply Filters</button>
            </div>
          </div>
        )}

        <div className='grid-cols-1 grid-cols-3 gap-6 mt-10 lg:grid'>
          {filteredProjects.length === 0 ? (
            <div>No Projects</div>
          ) : (
            filteredProjects.map((project, index) => (
              <div
                key={project._id}
                className='max-w-md p-4 my-6 text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 flex flex-col min-h-[420px]'
              >
                <p className='flex justify-end gap-1 text-sm'>
                  {project.status}
                  <FaRegDotCircle className={`${project.status === 'live' ? 'text-green-300' : 'text-red-300'}`} />
                </p>
                <h3 className='my-4 text-xl font-bold'>{project.title}</h3>
                <p className='mb-2 text-md'>{project.description}</p>
                <p className='mb-2 text-sm'>
                  <span className='font-bold'>Expected Duration: </span>
                  {project.expectedDuration} weeks
                </p>
                <p className='mb-4 text-sm'>
                  <span className='font-bold'>Contributor should: </span>
                  {project.contributionGuidelines}
                </p>
                <button className='w-full py-2 mt-auto text-white bg-blue-500 cursor-pointer rounded-2xl' onClick={()=>handleApply(project)}>Apply</button>
              </div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProjectListing;
