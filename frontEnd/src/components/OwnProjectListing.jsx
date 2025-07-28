import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CreatorNavBar from "./CreatorNavBar";
import { FaRegDotCircle } from "react-icons/fa";
import Footer from "./Footer";
import { FaPlusCircle } from "react-icons/fa";

function OwnProjectListing() {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const API_BASE = process.env.VITE_REACT_APP_API_URL;

  useEffect(() => {
    if (Cookies.get("role") !== "creator") {
      navigate("/");
    }
    setId(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.post(`${API_BASE}/get-projects`, { id }).then((res) => {
        setProjects(res.data.projects);
      });
      setLoading(false);
    }
  }, [id]);

  const showDetails = (project) => {
    navigate("/project_details", { state: project });
  };

  return (
    <div className="z-50 min-h-screen text-white bg-black">
      <CreatorNavBar />
      {loading ? (
        <div className="text-center text-white">Loading...</div>
      ) : (
        <div className="text-white"></div>
      )}
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
                      You haven't created any projects yet. Start one now and
                      build your dream team!
                    </p>
                    <div className="flex justify-center my-8">
                      <Link
                        to="/create"
                        className="flex gap-2 px-4 py-3 border border-white text-md rounded-2xl hover:bg-white hover:text-black"
                      >
                        <FaPlusCircle className="mt-0.5 text-xl" /> Create your
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
                      className="max-w-md p-4 my-6 text-justified text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 flex flex-col min-h-[420px]"
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
                      <p className="mb-2 text-sm">
                        <span className="mt-6 font-bold">
                          Contributor should:{" "}
                        </span>
                        {project.contributionGuidelines}
                      </p>
                      <p className="mb-4 text-sm">
                        <span className="mt-6 font-bold">
                          Pending Application:{" "}
                        </span>
                        {project.pendingRequests.length}
                      </p>
                      <button
                        className="w-full py-2 mt-auto text-white bg-blue-500 rounded-2xl"
                        onClick={(e) => {
                          showDetails(project);
                        }}
                      >
                        See Details
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

export default OwnProjectListing;
