import {Router} from 'express'
import {registerUser,loginUser,logoutUser,updateUserInfo,getUser } from '../controller/user.controller.js'
import {verifyJWT} from '../middleware/auth.middleware.js'
const router=Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.post("/logout",verifyJWT,logoutUser);
router.get("/profile/:id",getUser);
router.put("/update",verifyJWT,updateUserInfo);
export default router;




