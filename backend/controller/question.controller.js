import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


import { User } from "../model/user.model.js";
import { Question } from "../model/question.model.js";

const createQuestion = asyncHandler(async (req, res) => {
  const { title, description, tags, attachment, user } = req.body;

  if (!title || !description) {
    throw new ApiError(400, "All fields are required");
  }
  const question = create({ title, description, tags, attachment, user });
  await question.save();
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

export { createQuestion, updateQuestion, deleteQuestion,getQuestion };