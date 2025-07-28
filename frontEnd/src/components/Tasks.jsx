import React, { useEffect, useState } from "react";
import ContributorNavBar from "./ContributorNavBar";
import Footer from "./Footer";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const id = localStorage.getItem("id");
  const API_BASE = process.env.VITE_REACT_APP_API_URL;
  useEffect(() => {
    axios.get(`${API_BASE}/contributor-tasks/${id}`).then((res) => {
      if (res.data.projects) {
        const allTasks = [];

        res.data.projects.forEach((project) => {
          project.tasks.forEach((task) => {
            allTasks.push({
              ...task,
              projectTitle: project.title,
            });
          });
        });

        setTasks(allTasks);
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
              Your Tasks
            </h1>
            <div className="px-3">
              {tasks.length === 0 ? (
                <div className="flex justify-center mt-12 mb-12">
                  <div className="px-10 py-6 border border-white rounded-2xl">
                    <h1 className="my-6 text-3xl font-bold text-center">
                      You currently have no tasks from any project
                    </h1>
                  </div>
                </div>
              ) : (
                <div className="grid-cols-1 grid-cols-3 gap-6 mt-10 lg:grid">
                  {tasks.map((task, index) => (
                    <div
                      key={index}
                      className="max-w-md p-4 my-6 text-white border border-white shadow-lg bg-white/10 backdrop-blur-lg rounded-2xl hover:bg-white/20 flex flex-col min-h-[300px]"
                    >
                      <h3 className="text-lg font-semibold text-blue-400">
                        Project: {task.projectTitle}
                      </h3>
                      <h2 className="mt-2 mb-1 text-xl font-bold">
                        {task.title}
                      </h2>
                      <p className="mb-2 text-sm text-gray-200">
                        {task.description}
                      </p>
                      <p className="mt-auto text-sm font-semibold text-yellow-200">
                        Deadline: {task.deadline}
                      </p>
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

export default Tasks;
