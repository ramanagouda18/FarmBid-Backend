const {validationResult}=require('express-validator')
const Product = require('../models/product-model')
productCltr={}
productCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {body,files}=req
        const product=new Product(body)
        product.sellerId=req.user.id
        product.video=files.video[0].path
        product.image=files.image[0].path
        await product.save()
        res.status(201).json(product)
    }catch(err){
        res.status(500).json({error:'Internal Server Error'})
    }
}
productCltr.list=async(req,res)=>{
    try{
        const product=await Product.find()
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
productCltr.sellerList=async(req,res)=>{
    try{
        const product=await Product.find({sellerId:req.user.id})
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
productCltr.edit=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const id=req.params.id
    const {body,files}=req
    try{
        let updated={...body}
        if(!files.video || !files.image){
           return res.status(400).json({error:'video and image is required'})
        }
        updated.video=files.video[0].path
        updated.image=files.image[0].path
        const product=await Product.findOneAndUpdate({sellerId:req.user.id,_id:id},updated,{new:true})
        // product.video=files.video[0].path
        // product.image=files.image[0].path
        // await product.save()
        if(!product){
            return res.status(404).json({error:'product not found'})
        }
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
productCltr.destroy=async(req,res)=>{
    const id=req.params.id
    try{
        const product=await Product.findOneAndDelete({sellerId:req.user.id,_id:id})
        if(!product){
            return res.status(404).json({error:'product not found'})
        }
        res.json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
module.exports=productCltr