const mongoose=require('mongoose')
const ConfigureDb=async()=>{
   try{
    await mongoose.connect('mongodb://127.0.0.1:27017/FarmBidConnect')
    console.log('connected to Db successfully')
   }catch(err){
    console.log(err.message)
   }

}
module.exports=ConfigureDb