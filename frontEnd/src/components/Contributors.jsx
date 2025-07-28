import React, { useEffect, useState } from "react";
import CreatorNavBar from "./CreatorNavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Contributors() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [popup, setPopup] = useState(false);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    deadline: "",
  });
  const [projectId, setProjectId] = useState("");
  const [contributorId, setContributorId] = useState("");
  const API_BASE = process.env.VITE_REACT_APP_API_URL;
  const id = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect(() => {
    axios.post(`${API_BASE}/get-contributors`, { id }).then((res) => {
      setProjects(res.data.projects);
      setUsers(res.data.contributors);
    });
  }, []);

  const assignTask = (projectId, contributorId) => {
    setProjectId(projectId);
    setContributorId(contributorId);
    setPopup(true);
  };

  const handleChange = (e) => {
    setTaskDetails({ ...taskDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    axios
      .post(`${API_BASE}/task`, {
        ...taskDetails,
        projectId: projectId,
        contributorId: contributorId,
      })
      .then((res) => {
        if (res.data.message === "success") {
          alert("task added");
          setPopup(false);
          setTaskDetails({ title: "", descrption: "", deadline: "" });
        }
      });
  };

  const getUserById = (id) => users.find((user) => user._id === id);

  return (
    <div className="z-50 min-h-screen text-white bg-black">
      <CreatorNavBar />
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-white border border-black bg-black/50">
          <div className="w-full max-w-md p-6 bg-white border border-black shadow-lg rounded-xl">
            <h3 className="mb-6 text-xl font-semibold text-center text-black">
              Assign Task
            </h3>
            <input
              type="text"
              name="title"
              value={taskDetails.title}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full px-4 py-2 mb-3 text-black border border-black rounded placeholder:text-black"
            />
            <textarea
              name="description"
              value={taskDetails.description}
              onChange={handleChange}
              placeholder="Task Description"
              className="w-full px-4 py-2 mb-3 text-black border border-black rounded placeholder:text-black"
            />

            <input
              type="date"
              name="deadline"
              value={taskDetails.deadline}
              onChange={handleChange}
              className="w-full px-4 py-2 mb-4 text-black border border-black rounded placeholder:text-black"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setPopup(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-white bg-green-600 rounded"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="my-4">
        <h3 className="text-xl text-center">Here are all your contributors</h3>

        {projects.length > 0 ? (
          <div className="mx-10 mt-10 space-y-12">
            {projects.map((project) => (
              <div key={project._id}>
                <h2 className="mb-4 text-2xl font-bold text-blue-400">
                  Project: {project.title}
                </h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {project.contributors.map((contributorId) => {
                    const contributor = getUserById(contributorId);
                    if (!contributor) return null;

                    const tasks = project.tasks.filter(
                      (task) => task.assignedTo === contributorId
                    );

                    return (
                      <div
                        key={contributor._id}
                        className="p-4 transition-all border border-white shadow-lg bg-white/10 rounded-2xl min-w-60 backdrop-blur-lg hover:bg-white/20"
                      >
                        <p className="text-lg font-bold text-white">
                          {contributor.firstName}
                        </p>
                        <p className="mb-2 text-sm text-gray-300">
                          {contributor.email}
                        </p>
                        <p className="font-medium text-white">Tasks:</p>
                        {tasks.length > 0 ? (
                          <ul className="text-sm text-gray-200 list-disc list-inside">
                            {tasks.map((task) => (
                              <li key={task._id}>{task.title}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-gray-400">
                            No tasks assigned
                          </p>
                        )}
                        <div className="justify-between block my-2 lg:flex">
                          <button
                            className="py-2 my-2 mt-auto text-white bg-green-500 cursor-pointer min-w-60 lg:min-w-52 rounded-2xl"
                            onClick={() =>
                              assignTask(project._id, contributor._id)
                            }
                          >
                            Assign Task
                          </button>
                          <br />
                          <button className="py-2 my-2 mt-auto text-white bg-blue-500 cursor-pointer min-w-60 lg:min-w-52 rounded-2xl">
                            Update Status
                          </button>
                          <br />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No contributor data found</p>
        )}
      </div>
    </div>
  );
}

export default Contributors;
