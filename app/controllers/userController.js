const {validationResult}=require('express-validator')
const bcryptjs=require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const userCltr={}
userCltr.register=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    const user=new User(body)
    const nouser=await User.countDocuments()
    const salt=await bcryptjs.genSalt()
    const encrypted=await bcryptjs.hash(user.password,salt)
    user.password=encrypted
    user.username=user.username.toLowerCase()
    try{
        if(nouser==0){
            user.role='admin'
        }
        await user.save()
        res.json(user)
        
        
    }catch(err){
        res.status(500).json('Internal server error')
    }
}
userCltr.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const body=req.body
    try{
        const user=await User.findOne({email:body.email})
        if(!user){
            return res.status(400).json('Invalid email/password')
        }
        const password=await bcryptjs.compare(body.password,user.password)
        if(!password){
            return res.status(401).json('Invalid email/password')
        }
        const tokenData={
            id:user._id,
            role:user.role
        }
        const token=jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
        res.json({'token':token})
    }catch(err){
        res.status(500).json('Internal server error')
    }
}

module.exports=userCltr