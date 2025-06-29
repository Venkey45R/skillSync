import mongoose from "mongoose";

const ApplicationSchema = new mongoose.Schema({
    cover: {type: String, required: true},
    proof: {type: String, required: true},
    time: {type: Number},
    resume:{type: String},
    status: {type: String, default: "pending"},
    projectId: {type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true},
    projectName: {type: String, required: true}, 
    creatorId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    createdAt: { type: Date, default: Date.now },   
})

export const Application = mongoose.model("Application", ApplicationSchema);