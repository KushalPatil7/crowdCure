import {Router} from 'express'
import { registerUser,loginUser,logoutUser,getUser,updateUser } from '../controller/user.controller.js'
import {auth} from '../middleware/auth.middleware.js'
const router=Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/logout",auth,logoutUser);
router.get("/me",getUser);
router.put("/update",auth,updateUser);
export default router;




