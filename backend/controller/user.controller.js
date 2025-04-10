import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../model/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
      const user = await User.findById(userId);
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
  
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } catch (error) {
      throw new ApiError(
        500,
        "Something went wrong while generating refresh and access token"
      );
    }
  };

const registerUser=asyncHandler(async(req,res)=>{
    const {fullName,userName,email,password}=req.body;

    if(!fullName|| !userName || !email || !password){
        throw new ApiError(400,"All fields are required")

    }
    const existedUser=await User.findOne({
        $or:[{userName:userName.toLowerCase()},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists")

    }
    const user=await User.create({
        fullName,
        email,
        userName:userName.toLowerCase(),
        password
    })
    return res
    .status(201)
    .json(new ApiResponse(201,user,"User registered successfully"))
})
const loginUser=asyncHandler(async(req,res)=>{
    const {userName,email,password}=req.body;
    if((!userName || !email)&& !password){
        throw new ApiError(400,"All fields are required")
    }
    const user=await User.findOne({
        $or:[{userName},{email}]
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
    .json(new ApiResponse(200,{},"User logged out successfully"))
})

const updateUserInfo=asyncHandler(async(req,res)=>{
    const {fullName,userName, bio}=req.body;
    const user=await User.findByIdAndUpdate(req.user?._id,{
    $set:{
        fullName,
        userName:userName,
        bio:bio
    },
   }).select('-password -refreshToken')
   return res
   .status(200)
   .json(new ApiResponse(200,user,"User details updated successfully"))
})

const getUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "User ID is required");
    }

    // Select only public fields
    const user = await User.findById(id)
        .select("fullName userName bio collaborations questions createdAt")
        .populate('collaborations', 'title description')
        .populate('questions', 'title content');

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User profile fetched Successfully"));
});

export {registerUser,loginUser,logoutUser,updateUserInfo,getUser}