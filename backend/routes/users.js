import express from 'express'
import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {check,validationResult} from "express-validator"
const router=express.Router()

router.post('/',[
check('username',"Name is required").not().isEmpty(),
check('email',"Please include a valid Email").isEmail(),
check('password',"Please enter a password od 6 or more characters").isLength({min:6})
],
async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
    }
    const {username,email,password}=req.body;
    try{
    let user=await User.findOne({email});
    if(user){
        return res.status(400).json({msg:'User already exists'});
    }
    user=new User({
        username,
        email,
        password,

    })
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(password,salt);
    await user.save()

    const payload={
        user:{
            id:user.id,
        }
    }
    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn:360000,
        },
        (err,token)=>{
            if(err)throw err;
            res.json({token})
        }
    )
    }catch(err){
    console.error(err.message)
    res.status(500).send('Server error')
    }
}
)
export default router;