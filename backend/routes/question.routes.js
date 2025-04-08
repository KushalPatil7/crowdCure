import {Router} from 'express';
import { createQuestion, updateQuestion, getQuestionById, getAllQuestions, deleteQuestion } from '../controller/question.controller.js';
import { auth } from '../middleware/auth.middleware.js';
const router=Router();


router.post("/createQuestion",auth,createQuestion);
router.put("/updateQuestion/:id",auth,updateQuestion);
router.delete("/deleteQuestion/:id",auth,deleteQuestion);
router.get("/getQuestion/",getQuestionById);