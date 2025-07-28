import React, { useEffect, useState } from "react";
import ContributorNavBar from "./ContributorNavBar";
import { Link, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaRegDotCircle } from "react-icons/fa";
import axios from "axios";
import Footer from "./Footer";

function MyProjects() {
  const [projects, setProjects] = useState([]);
  const id = localStorage.getItem("id");
  const navigate = useNavigate();
  const API_BASE = process.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API_BASE}/projects/${id}`).then((res) => {
      if (res.data.message === "success") {
        setProjects(res.data.projects);
      } else {
        alert("Something went wrong");
      }
    });
  }, []);

  return (
    <div className="z-50 min-h-screen text-white bg-black">
      <ContributorNavBar />
      <div className="">
        <div className="flex items-center justify-center py-10">
          <div>
            <h1 className="my-2 mb-6 text-2xl font-bold text-center">
              Your Projects
            </h1>
            <div className="px-3">
              {projects.length === 0 ? (
                <div className="flex justify-center mt-12 mb-12">
                  <div className="px-10 py-6 border border-white rounded-2xl">
                    <h1 className="my-6 text-3xl font-bold text-center">
                      You currently have no projects
                    </h1>
                    <p className="text-lg text-center">
                      {" "}
                      You haven't joined any projects yet. Join one now.
                    </p>
                    <div className="flex justify-center my-8">
                      <Link
                        to="/find"
                        className="flex gap-2 px-4 py-3 border border-white text-md rounded-2xl hover:bg-white hover:text-black"
                      >
                        <FaPlusCircle className="mt-0.5 text-xl" /> Join your
                        first project
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid-cols-1 grid-cols-3 gap-6 mt-10 lg:grid">
                  {projects.map((project, index) => (
                    <div
                      key={project.id}
                      className="max-w-md p-4 my-6 text-justified text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 flex flex-col min-h-[300px]"
                    >
                      <p className="flex justify-end gap-1 text-sm">
                        {project.status}
                        <FaRegDotCircle
                          className={`${
                            project.status === "live"
                              ? "text-green-300"
                              : "text-red-300"
                          }`}
                        />
                      </p>
                      <h3 className="my-4 text-xl font-bold">
                        {project.title}
                      </h3>
                      <p className="mb-2 text-md">{project.description}</p>
                      <p className="mb-2 text-sm">
                        <span className="mt-6 font-bold">
                          Expected Duration:{" "}
                        </span>
                        {project.expectedDuration}
                      </p>
                      <button
                        className="w-full py-2 mt-auto text-white bg-blue-500 rounded-2xl"
                        onClick={() => navigate("/tasks")}
                      >
                        See Assigned Tasks
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MyProjects;
