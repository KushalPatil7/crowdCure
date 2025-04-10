import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

import { Answer } from "../model/answer.model.js";
import { Question } from "../model/question.model.js";

const createAnswer = asyncHandler(async (req, res) => {
   const {content, user, question} = req.body;
   
   if(!question || !content){
       throw new ApiError(400, "All fields are required");
   }
   
   const existingQuestion = await Question.findById(question);
   if(!existingQuestion){
       throw new ApiError(404, "Question not found");
   }
   
   const answer = await Answer.create({content, user, question});
   // No need for separate save() after create()
   
   return res.status(201).json(
       new ApiResponse(201, answer, "Answer created successfully")
   );
})

const editAnswer = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const { id } = req.params; // Answer ID should come from URL params
    
    if(!content){
        throw new ApiError(400, "Content is required");
    }
    
    const answer = await Answer.findById(id);
    if(!answer){
        throw new ApiError(404, "Answer not found");
    }
    
    // Check if user is authorized to edit
    if(answer.user.toString() !== req.user.id){
        throw new ApiError(403, "Not authorized to edit this answer");
    }
    
    const updatedAnswer = await Answer.findByIdAndUpdate(
        id,
        { $set: { content } },
        { new: true }
    );
    
    return res.status(200).json(
        new ApiResponse(200, updatedAnswer, "Answer updated successfully")
    );
})

const deleteAnswer = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const answer = await Answer.findById(id);
    if(!answer){
        throw new ApiError(404, "Answer not found");
    }
    
    // Check if user is authorized to delete
    if(answer.user.toString() !== req.user.id){
        throw new ApiError(403, "Not authorized to delete this answer");
    }
    
    await Answer.findByIdAndDelete(id);
    
    return res.status(200).json(
        new ApiResponse(200, null, "Answer deleted successfully")
    );
})
const getAllAnswers=asyncHandler(async(req,res)=>{
    try {
        const answers = await Question.findById(req.params.id); // Correct method name

        if (!answers) {
            throw new ApiError(404, "Answers not found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, answers, "Answers fetched successfully"));
    } catch (error) {
        return res.status(500).json(new ApiError(500, "Internal Server Error", error.message));
    }
    
   
})
export { createAnswer, editAnswer, deleteAnswer ,getAllAnswers};