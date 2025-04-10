import {Router} from "express"
import  {createAnswer,editAnswer,getAllAnswers,deleteAnswer} from "../controller/answer.controller.js"  
const router=Router()

import {verifyJWT} from "../middleware/auth.middleware.js"

router.post("/createAnswer",verifyJWT,createAnswer);
router.put("/updateAnswer/:id",verifyJWT,editAnswer);
router.delete("/deleteAnswer/:id",verifyJWT,deleteAnswer);
router.get("/getAnswer/:id",getAllAnswers);
export default router