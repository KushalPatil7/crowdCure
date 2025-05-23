import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import { Question } from "../model/question.model.js";
import { get } from "mongoose";


const getQuestionsByUser = async (userId) => {
  try {
    const questions = await Question.find({ user: userId }).populate('answer'); // populate the 'answer' field if needed
    return questions;
  } catch (error) {
    console.error("Error fetching questions by user:", error);
    throw error; // or handle it as necessary
  }
};
const createQuestion = asyncHandler(async (req, res) => {
  const { title, description, tags, attachment, user } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "All fields are required");
  }

  const question = await Question.create({ title, description, tags, attachment, user });

  return res
    .status(200)
    .json(new ApiResponse(200, question, "Question created successfully"));
});


const updateQuestion = asyncHandler(async (req, res) => {
    const { title, description, tags } = req.body;
  
    // Fetch question first
    const question = await Question.findById(req.params.id);
  
    if (!question) {
     throw new ApiError(404, "Question not found");
    }
  
    // Ensure the user owns the question
    if (question.user.toString() !== req.user.id) {
      throw new ApiError(403, "You do not have permission to update this question")
    }
  
    // Update question
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        $set: { title, description, tags },
      },
      { new: true, runValidators: true }
    );
  
    return res.status(200).json(new ApiResponse(200, updatedQuestion, "Question updated successfully"));
  });
  
const deleteQuestion=asyncHandler(async(req,res)=>{
    const question=await Question.findById(req.params.id);
    if(!question){
        throw new ApiError(404,"Question not found");
    }
    if(question.user.toString()!=req.user.id){
        throw new ApiError(403,"You do not have permission to delete this question");
    }
    await Question.findByIdAndDelete(req.params.id);
    return res.status(200).json(new ApiResponse(200,{}, "Question deleted successfully"));
})
const getQuestion=asyncHandler(async(req,res)=>{
    const question=await Question.findById(req.params.id);
    if(!question){
        throw new ApiError(404,"Question not found");
    }
    return res.status(200).json(new ApiResponse(200,question,"Question fetched successfully"));

})
const getAllQuestions=asyncHandler(async(req,res)=>{
  try {
    const questions = await Question.find().populate('user', 'name');

    return res.status(200).json(new ApiResponse(200, questions, "Questions fetched successfully"));
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

const getQuesofUser= asyncHandler(async(req,res)=>{
  const {id}=req.params;
  const user=await User.findById(id)
  if(!user){
    throw new ApiError(404,"User not found")
  }
  const ques=await getQuestionsByUser(id);
  return res.status(200).json(new ApiResponse(200,ques,"Questions fetched successfully"));

})


export { createQuestion, updateQuestion, deleteQuestion,getQuestion, getAllQuestions, getQuesofUser };