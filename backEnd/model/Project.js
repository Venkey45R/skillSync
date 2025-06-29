import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },                  
  description: { type: String, required: true },           
  tags: [{ type: String }],                                
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  status: { type: String, enum: ["draft", "live", "completed"], default: "live" }, 
  contributorsRequired: { type: Number, required: true }, 
  contributors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],           
  pendingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],        
  tasks: [{                                              
    title: String,
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
    deadline: Date,
  }],
  expectedDuration: { type: String }, 
  contributionGuidelines: { type: String }, 
  createdAt: { type: Date, default: Date.now },          
});


export const Project = mongoose.model("Project", ProjectSchema);
