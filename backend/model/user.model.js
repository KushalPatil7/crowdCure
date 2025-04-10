import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {Project} from './project.model.js'
import { Question } from './question.model.js';
const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
      type:String,
      required:true,
      unique:true
    }
    ,
    userName:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    collaborations:[
      {
        type:mongoose.Schema.Types.ObjectId,
        ref:Project

      }
    ],
    questions:[
      {type:mongoose.Schema.Types.ObjectId,
        ref:Question
      }

    ]

},{timestamps:true});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );
  };
  userSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
      {
        _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );
  };


const User=mongoose.model("User",userSchema)
export {User}