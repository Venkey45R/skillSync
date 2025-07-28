import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { User } from "./model/User.js";
import { Project } from "./model/Project.js";
import bcrypt from "bcrypt";
import { Application } from "./model/Application.js";
import multer from "multer";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import sendMail from "./sendMail.js";

const app = express();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://venki:venki45R@cluster0.zcda0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

app.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.json("user found");
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashedPassword,
    });
    await newUser.save();
    sendMail(
      req.body.email,
      `Welcome to Skill Sync`,
      `<h2>Hello ${req.body.firstName},</h2><p>Thank you for signing up! You’re now part of a growing community of creators and contributors turning ideas into real-world projects.
        Whether you're here to:
        🚀 Build and manage your dream team, or
        💻 Contribute your skills to meaningful tech projects
        —we’ve built SkillSync to make collaboration seamless and purposeful.
        🔒 Your account has been securely created. You can now log in and get started on your journey.</p>
        <h2>Thank You!!!</h2>`
    );
    const token = newUser.generateAuthToken();
    res.json({ message: "success", id: newUser._id, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json("error");
  }
});

app.post("/signin", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    res.json("user not found");
  } else {
    const isPasswordValid = bcrypt.compare(req.body.password, user.password);
    if (!isPasswordValid) {
      res.json("password incorrect");
    } else {
      const token = user.generateAuthToken();
      res.json({
        token: token,
        message: "success",
        id: user._id,
        isOnBoarded: user.isOnBoarded,
        role: user.role,
      });
    }
  }
});

app.post("/google", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    const newUser = new User({
      email: req.body.email,
      firstName: req.body.firstName,
    });
    await newUser.save();
    sendMail(
      req.body.email,
      `Welcome to Skill Sync`,
      `<h2>Hello ${req.body.firstName},</h2><p>Thank you for signing up! You’re now part of a growing community of creators and contributors turning ideas into real-world projects.
        Whether you're here to:
        🚀 Build and manage your dream team, or
        💻 Contribute your skills to meaningful tech projects
        —we’ve built SkillSync to make collaboration seamless and purposeful.
        🔒 Your account has been securely created. You can now log in and get started on your journey.</p>
        <h2>Thank You!!!</h2>`
    );
    const token = newUser.generateAuthToken();
    res.json({
      message: "success",
      id: newUser._id,
      isOnBoarded: newUser.isOnBoarded,
      token: token,
      role: newUser.role,
    });
  } else {
    const token = user.generateAuthToken();
    res.json({
      message: "success",
      id: user._id,
      isOnBoarded: user.isOnBoarded,
      token: token,
      role: user.role,
    });
  }
});

app.post("/onBoard", async (req, res) => {
  const UserId = req.body.id;
  const user = await User.findByIdAndUpdate(UserId, {
    role: req.body.role,
    phoneNumber: req.body.phone,
    location: req.body.location,
    linkedin: req.body.linkedin,
    github: req.body.github,
    about: req.body.bio,
  });
  if (!user) {
    res.json("user not found");
  } else {
    res.json({ message: "success", user: user });
  }
});

app.post("/role", async (req, res) => {
  const arr = Array.isArray(req.body.selected_skills)
    ? req.body.selected_skills.map((s) => s.value)
    : [];
  const user = await User.findByIdAndUpdate(req.body.id, {
    role: "contributor",
    isOnBoarded: true,
    contributorProfile: {
      skills: arr,
      projects: req.body.projects,
      experience: req.body.experience,
    },
    updatedAt: Date.now(),
  });

  if (!user) {
    res.json("user not found");
  } else {
    res.json("success");
  }
});

app.post("/projects", async (req, res) => {
  const {
    id,
    title,
    descrption,
    tags,
    contributorRequired,
    expectedDuration,
    guidelines,
  } = req.body;

  if (!id) {
    return res.json("user not found");
  }

  const newProject = new Project({
    title,
    description: descrption,
    tags: Array.isArray(tags) ? tags.map((tag) => tag.value) : [],
    creatorId: id,
    contributorsRequired: contributorRequired,
    expectedDuration,
    contributionGuidelines: guidelines,
    contributors: [],
    pendingRequests: [],
    tasks: [],
  });

  await newProject.save();
  res.json({ message: "success", project: newProject });
});

app.post("/get-projects", async (req, res) => {
  const id = req.body.id;
  if (!id) {
    res.json("user not found");
  }
  const projects = await Project.find({ creatorId: id });
  if (!projects) {
    res.json("no projects found");
  } else {
    res.json({ message: "success", projects: projects });
  }
});

app.post("/get-allprojects", async (req, res) => {
  const projects = await Project.find({});
  res.json({ message: "success", projects: projects });
});
app.post("/company", async (req, res) => {
  const user = await User.findByIdAndUpdate(req.body.id, {
    role: "creator",
    isOnBoarded: true,
    creatorProfile: {
      company_name: req.body.company,
      company_bio: req.body.bio,
      location: req.body.locations,
      website: req.body.contact,
    },
    updatedAt: Date.now(),
  });
  if (!user) {
    res.json("user not found");
  } else {
    res.json("success");
  }
});

app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.json("user not found");
  } else {
    res.json(user);
  }
});

app.post("/allow-application", async (req, res) => {
  const { projectId, userId } = req.body;

  if (!projectId || !userId || userId.length !== 24) {
    return res.status(400).json({ message: "Invalid projectId or userId" });
  }

  const alreadyApplied = await Application.find({ projectId, userId });

  if (alreadyApplied.length > 0) {
    return res.json({ message: "already applied" });
  }

  return res.json({ message: "not applied" });
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/application", upload.single("resume"), async (req, res) => {
  const { cover, proof, time, projectId, projectName, creatorId, userId } =
    req.body;
  const resumePath = req.file ? req.file.path.replace(/\\/g, "/") : "";
  if (!projectId || !userId) {
    res.json("Something went wrong");
  } else {
    const application = new Application({
      cover,
      proof,
      time,
      resume: resumePath,
      projectId,
      projectName,
      creatorId,
      userId,
    });
    await application.save();
    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $push: { pendingRequests: userId } },
      { new: true }
    );
    if (!updatedProject) {
      return res.json({ message: "project not found" });
    }
    const receiver = await User.findById(creatorId);
    sendMail(
      receiver.email,
      `Someone applied to your project!`,
      `<h2>Hello ${receiver.firstName},</h2><p>
       Great news! You’ve just received a new application for your project, ${projectName} on SkillSync. Here’s what you can do next:
       📝 Review the contributor’s cover letter and portfolio
       ✅ Accept or reject the request from your dashboard
       🔔 Connect and assign tasks to your contributors
      We're excited to see your project take shape with the right team.
      Cheers,
        — SkillSync Team 🚀
      </p>
    `
    );
    res.json({ message: "success" });
  }
});

app.post("/my-application", async (req, res) => {
  const application = await Application.find({ userId: req.body.userId });
  if (!application) {
    res.json({ message: "no applications found" });
  } else {
    res.json({ message: "success", application: application });
  }
});

app.post("/all-application", async (req, res) => {
  const application = await Application.find({ creatorId: req.body.userId });
  if (!application) {
    res.json({ message: "no applications received" });
  } else {
    res.json({ message: "success", application: application });
  }
});

app.post("/get-contributors", async (req, res) => {
  const projects = await Project.find({ creatorId: req.body.id });
  const contributorsIds = projects.flatMap((p) => p.contributors);
  const contributors = await User.find({ _id: { $in: contributorsIds } });
  res.json({
    message: "success",
    contributors: contributors,
    projects: projects,
  });
});

app.post("/task", async (req, res) => {
  const { title, description, deadline, projectId, contributorId } = req.body;
  const task = { title, description, deadline, assignedTo: contributorId };
  await Project.findByIdAndUpdate(projectId, {
    $push: { tasks: task },
  });
  res.json({ message: "success" });
});

app.get("/projects/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const projects = await Project.find({ contributors: id });
    res.json({ message: "success", projects: projects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.get("/contributor-tasks/:id", async (req, res) => {
  try {
    const contributorId = req.params.id;
    const projects = await Project.find({ "tasks.assignedTo": contributorId });

    const filteredProjects = projects.map((project) => {
      const assignedTasks = project.tasks.filter(
        (task) => task.assignedTo.toString() === contributorId
      );
      return {
        _id: project._id,
        title: project.title,
        creatorId: project.creatorId,
        tasks: assignedTasks,
      };
    });

    res.json({ message: "success", projects: filteredProjects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/update", async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.body.id,
      {
        status: req.body.status,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    if (req.body.status === "accept") {
      await Project.findByIdAndUpdate(application.projectId, {
        $addToSet: { contributors: application.userId },
        $pull: { pendingRequests: application.userId },
      });
    }
    const receiver = await User.findById(application.userId);
    if (receiver) {
      sendMail(
        receiver.email,
        `Creator responded to your application!`,
        `<h2>Hello ${receiver.firstName},</h2><p>
          The status of your application has been updated by the creator. Check it for further process.
          <br /><br />Cheers,<br />
          — SkillSync Team 🚀
        </p>`
      );
    }

    return res.json("success");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("server is running");
});
