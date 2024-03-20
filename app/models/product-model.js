const {Schema , model } = require('mongoose')

const productSchema = new Schema({
    sellerId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    productName:String ,
    image:String,
    video:String,
    basePrice:String,
    stock:String,
    weight:String,
    address:String
},{timestamps:true})

const Product = model('Product' , productSchema)

module.exports = Product