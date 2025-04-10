import {Router} from 'express';
import { createQuestion, updateQuestion, deleteQuestion,getQuestion  } from '../controller/question.controller.js';
import { verifyJWT} from '../middleware/auth.middleware.js';
const router=Router();


router.post("/createQuestion",verifyJWT,createQuestion);
router.put("/updateQuestion/:id",verifyJWT,updateQuestion);
router.delete("/deleteQuestion/:id",verifyJWT,deleteQuestion);
router.get("/getQuestion/",getQuestion);
export default router