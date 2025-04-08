import { asyncHandler } from "../utils/asyncHandler";
import {ApiError} from "../utils/ApiError";
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse";
import jwt from "jsonwebtoken";

const registerUser=asyncHandler(async(req,res)=>{
    const {fullname,username,email,password}=req.body;

    if(!fullname|| !username || !email || !password){
        return new ApiError(400,"All fields are required")

    }
    const existedUser=User.findOne({
        $or:[{username:username.toLowerCase()},{email}]
    })
    if(existedUser){
        return new ApiError(409,"User already exists")

    }
    const user=await User.create({
        fullname,
        email,
        username:username.toLowerCase(),
        password
    })
    return res
    .status(201)
    .json(new ApirResponse(201,user,"User registered successfully"))
})
const loginUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body;
    if((!username || !email)&& !password){
        throw new ApiError(400,"All fields are required")
    }
    const user=await User.findOne({
        $or:[{username},{email}]
    })
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const isPasswordValid=await user.isPasswordCorrect(password)
    if(!isPasswordValid){
        throw new ApiError(400,"Invalid Password")
    }
    const {accessToken, refreshToken}=await generateAccessAndRefreshToken(user._id)
    const loggedinUser=await User.findById(user._id).select("-password -refreshToken");
    
    const options={
        httpOnly:true,
        secure:true,
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(
            200,
            {
                user:loggedinUser,
                accessToken,
                refreshToken
            },
            "User logged in successfully"
        )
    )
})
const logoutUser=asyncHandler(async(req,res)=>{
   await User.findByIdAndUpdate(
    req.user._id,
    {$set:{refreshToken:undefined}},
    {new:true}
   )
   const options={
    httpOnly:true,
    secure:true,
   }
   return res
   .status(200)
   .clearCookie("accessToken",options)
   .clearCookie("refreshToken",options)

})

const updateUserInfo=asyncHandler(async(req,res)=>{
    const {fullname,username, bio}=req.body;
   const user=await User.findByIdAndUpdate(req.user?._id,{
    $set:{
        fullname,
        username:username,
        bio:bio
    },
   }).select('-password -refreshToken')
   return res
   .status(200)
   .json(new ApiResponse(200,user,"User details updated successfully"))
})

const getUser=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user?._id)
    return res
    .status(200)
    .json(new ApiResponse(200,user,"User fetched Successfully"))
})



export {registerUser,loginUser,logoutUser,updateUserInfo,getUser}