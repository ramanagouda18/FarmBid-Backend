const express=require('express')
require('dotenv').config()
const path=require('path')
const cors=require('cors')
const ConfigureDb = require('./config/db')
const { checkSchema } = require('express-validator')
const {userRegisterValidation, userLoginValidation} = require('./app/validations/userRegisterValidation')
const productCreateSchema=require('./app/validations/productValidationSchema')
const userCltr=require('./app/controllers/userController')
const productCltr=require('./app/controllers/product-controller')
const { authenticateUser, authorizeUser } = require('./app/middlewares/auth')
const app=express()
app.use(express.json())
app.use(cors())
ConfigureDb()
const port=3000
const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        if(file.mimetype.startsWith('video')){
            cb(null,'./app/files/videos')
        }
       else if(file.mimetype.startsWith('image')){
            cb(null,'./app/files/images')
        }
        else{
            cb(new Error ('invalid file type'))
        }
    },
    filename:(req,file,cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`)
    }
})
app.use('/videos',express.static(path.join(__dirname,'vidoes')))
app.use('/images',express.static(path.join(__dirname,'images')))
const upload=multer({storage})

app.post('/api/register',checkSchema(userRegisterValidation),userCltr.register)
app.post('/api/login',checkSchema(userLoginValidation),userCltr.login)
app.post('/api/create-product',authenticateUser,authorizeUser(['seller']),upload.fields([{name:'image',maxCount:3},{name:'video',maxCount:1}]),checkSchema(productCreateSchema),productCltr.create)
app.get('/api/vegetables' , authenticateUser , authorizeUser(['buyer']),productCltr.list)
app.get('/api/all-vegetables' ,productCltr.list) // for all without login
app.get('/api/vegetables/my' , authenticateUser , authorizeUser(['seller']),productCltr.sellerList)
app.put('/api/vegetables/:id',authenticateUser,authorizeUser(['seller']),upload.fields([{name:'image',maxCount:3},{name:'video',maxCount:1}]),checkSchema(productCreateSchema),productCltr.edit)
app.delete('/api/vegetables/:id',authenticateUser,authorizeUser(['seller']),productCltr.destroy)
app.listen(port,()=>{
    console.log("app is running on port " + port)
})