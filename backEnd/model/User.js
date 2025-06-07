import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import dotenv from "dotenv";
dotenv.config();

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true},
});

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET,{expiresIn: "7d"});
    return token;
}

export const User = mongoose.model("User", UserSchema);
