import React from 'react';
import { useLocation } from 'react-router-dom';
import CreatorNavBar from '../components/CreatorNavBar';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import Footer from './Footer';

ChartJS.register(ArcElement, Tooltip, Legend);

function ProjectDetails() {
  const location = useLocation();
  const project = location.state;

  const required = project.contributorsRequired || 0;
  const contributors = project.contributors?.length || 0;
  const remaining = Math.max(required - contributors, 0);
  const pending = project.pendingRequests?.length || 0;

  const pieData = {
    labels: ['Current Contributors', 'Contributors Needed', 'Pending Requests'],
    datasets: [
      {
        data: [contributors, remaining, pending],
        backgroundColor: ['#34d399', '#60a5fa', '#fbbf24'],
        borderColor: '#fff',
        borderWidth: 2
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-b from-black via-gray-900 to-black">
      <CreatorNavBar />

      <div className="flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl p-6 border border-white shadow-lg bg-white/10 backdrop-blur-md rounded-2xl">
          
          {/* Header */}
          <h2 className="mb-4 text-3xl font-bold text-center text-white">{project.title}</h2>
          <p className="mb-2 text-sm text-center text-gray-300">{project.description}</p>
          <p className="mb-6 text-xs text-center text-gray-400">
            <span className="font-semibold">Status:</span> {project.status} •{' '}
            <span className="font-semibold">Duration:</span> {project.expectedDuration} weeks
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {project.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-semibold text-white bg-purple-600 rounded-full shadow-md"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            
            {/* Pie Chart */}
            <div className="flex items-center justify-center h-80">
              <div className="w-full h-full">
                <h3 className="mb-3 font-semibold text-center text-white text-md">
                  Contributor Overview
                </h3>
                <Pie key={JSON.stringify(pieData)} data={pieData} options={pieOptions} />
              </div>
            </div>

            {/* Project Info */}
            <div className="flex flex-col justify-center px-2 space-y-4">
              <p className="text-sm"><span className="font-bold">Contributors Required:</span> {required}</p>
              <p className="text-sm"><span className="font-bold">Current Contributors:</span> {contributors}</p>
              <p className="text-sm"><span className="font-bold">Pending Requests:</span> {pending}</p>
              <p className="text-sm"><span className="font-bold">Contribution Guidelines:</span> {project.contributionGuidelines}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProjectDetails;
