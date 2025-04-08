import {Router} from "express"
import  {createAnswer,editAnswer,getAllAnswers,deleteAnswer} from "../controller/answer.controller.js"  
const router=Router()

import { auth } from "../middleware/auth.middleware.js"

router.post("/createAnswer",auth,createAnswer);
router.put("/updateAnswer/:id",auth,editAnswer);
router.delete("/deleteAnswer/:id",auth,deleteAnswer);
router.get("/getAnswer/:id",getAllAnswers);
