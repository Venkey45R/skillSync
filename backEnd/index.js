import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { User } from './model/User.js';
import bcrypt from 'bcrypt';

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://venki:venki45R@cluster0.zcda0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

app.post('/user', async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) return res.json("user found");
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      firstName: req.body.firstName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    await newUser.save();
    res.json("success");
  } catch (err) {
    console.error(err);
    res.status(500).json("error");
  }
});

app.post('/signin', async (req, res) =>{
  const user = await User.findOne({email : req.body.email});
  if(!user){
    res.json("user not found");
  }
  else{
    const isPasswordValid = await bcrypt.compare(req.body.password, user.password); 
    if(!isPasswordValid){
      res.json("password incorrect");
    }
    else{
      const token = user.generateAuthToken();
      res.json({token: token, message: "success"});
    }
  }
})

app.listen(3000, () => {
  console.log("server is running");
});
