import { asyncHandler } from "../utils/asyncHandler";
import Question from "../model/question.model.js"
import { ApiResponse } from "../utils/ApiResponse";
import {ApiError} from "../utils/ApiError.js"
import {Project} from "../model/project.model.js"
const searchService=asyncHandler(async (req, res) => {
    try {
        const {query}=req.query;
        if(!query){
            return res.status(400).json(new ApiError(400,"Query is required"))
        }
        const questions=await Question.find({$text:{$search:query}},
            {score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}}).limit(10);
        const projects=await Project.find({$text:{$search:query}},
            {score:{$meta:"textScore"}}).sort({score:{$meta:"textScore"}}).limit(10);
        res.status(200).
        json(new ApiResponse(200,{questions,projects},"Search results fetched Successfully"));
    } catch (error) {
        throw new ApiError(400,"Some Error in fetching result",error)
    }
})

export {searchService}