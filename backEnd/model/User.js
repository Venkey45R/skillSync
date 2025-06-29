import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
  },

  isOnBoarded: {
    type: Boolean,
    default: false,
  },

  role: {
    type: String,
    enum: ['creator', 'contributor'],
  },

  phoneNumber: {
    type: String,
  },

  location: {
    type: String,
  },

  linkedin: {
    type: String,
  },

  github: {
    type: String,
  },

  about: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },

  creatorProfile: {
    company_name: String,
    company_bio: String,
    location: String,
    website: String,
  },

  contributorProfile: {
    skills: [String],
    projects: String,
    experience: Number,
  }
});

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{expiresIn: "7d"});
    return token;
}

export const User = mongoose.model("User", UserSchema);
