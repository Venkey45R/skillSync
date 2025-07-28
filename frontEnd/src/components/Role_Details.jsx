import React, { useState } from "react";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import details_bg from "../assets/details.mp4";
import Footer from "./Footer";
import AlertBox from "./AlertBox";
import axios from "axios";
import Select from "react-select";
import confetti from "canvas-confetti";

function Role_Details() {
  const location = useLocation();
  const id = localStorage.getItem("id");
  const role = location.state;
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });
  const showTempAlert = (message, type = "success") => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 2000);
  };
  const API_BASE = process.env.VITE_REACT_APP_API_URL;

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
    { value: "communication", label: "Communication" },
  ];

  const [selected_skills, setSelectedSkills] = useState([]);
  const [projects, setProjects] = useState("");
  const [experience, setExperience] = useState("");
  const navigate = useNavigate();
  if (role !== "contributor") {
    navigate("/");
  }
  const handleChange = (selected_skill) => {
    setSelectedSkills(selected_skill);
  };

  const handleSubmit = () => {
    if (selected_skills.length > 5) {
      showTempAlert("Select only 5 skills", "error");
    } else {
      if (!id) {
        showTempAlert("something went wrong, try signing in again", "error");
        navigate("/signin");
      } else {
        axios
          .post(`${API_BASE}/role`, {
            id,
            selected_skills,
            projects,
            experience,
          })
          .then((res) => {
            if (res.data === "success") {
              Cookies.set("role", "contributor");
              confetti({
                particleCount: 500,
                spread: 90,
              });
              showTempAlert("OnBoarding success", "success");
              setTimeout(() => {
                navigate("/contributor-home");
              }, 2000);
            } else {
              showTempAlert("Somthing went wrong", "error");
              navigate("/signin");
            }
          });
      }
    }
  };

  return (
    <div className="relative min-h-screen">
      <video
        autoPlay
        muted
        loop
        playsInline
        className=" inset-0 w-full fixed min-h-screen object-cover z-[-1]"
      >
        <source src={details_bg} type="video/mp4" />
      </video>
      <div className="relative z-10 text-white">
        {alert.show && (
          <div className="fixed z-50 transform -translate-x-1/2 top-5 left-1/2">
            <AlertBox
              type={alert.type}
              message={alert.message}
              onClose={() => setAlert({ ...alert, show: false })}
            />
          </div>
        )}
      </div>
      <div className="flex justify-between px-8 py-6 border-b border-white lg:px-20">
        <div>
          <h1 className="text-2xl font-bold text-white lg:text-3xl font-rubik">
            Skill Sync
          </h1>
        </div>
        <div>
          <p className="mt-2 text-sm lg:text-base">Idea Meets Execution!</p>
        </div>
      </div>
      <div className="flex items-center justify-center p-5">
        <div className="px-6 py-8 border-2 shadow-lg min-w-80 lg:min-w-md border-white/20 bg-white/10 rounded-3xl backdrop-blur-md">
          <h3 className="mb-6 text-3xl font-semibold text-center text-white">
            Let us know about you
          </h3>
          <div className="mb-3">
            <label className="block mb-3 text-sm font-medium text-white">
              Your Skills: <span>[max-5]</span>
            </label>
            <div className="rounded-xl">
              <Select
                options={skills}
                value={selected_skills}
                onChange={handleChange}
                isMulti={true}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="block mb-3 text-sm font-medium text-white">
              Projects:<span>(if any, explain in 2-3 lines)</span>
            </label>
            <textarea
              rows={3}
              placeholder="explain about the technologies used and keep it simple..."
              onChange={(e) => setProjects(e.target.value)}
              className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"
            />
          </div>
          <div className="mb-3">
            <label className="block mb-2 text-sm font-medium text-white">
              Experience{" "}
              <span className="text-sm text-white/60">(in months)</span>
            </label>
            <input
              type="text"
              placeholder="Enter your experience"
              onChange={(e) => setExperience(e.target.value)}
              className="w-full px-4 py-3 text-white rounded-xl bg-white/20 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-sky-400 backdrop-blur-sm"
            />
          </div>
          <button
            className="w-full py-2 bg-blue-500 border border-white rounded-xl"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Role_Details;
