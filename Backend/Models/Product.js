const mongoose = require('mongoose');

const productSchema = new  mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:50
    },
    slug:{
        type:String,
        required:true,
        maxLength:50,
        unique:true
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    discount_percent:{
        type:Number,
        default:0
    },
    discount_price:{
        type:Number,
        // default:0
    },
    image:{
        type:String,
        // required:true, 
        maxLength:200
    },
    category_id:{
        type:mongoose.Schema.ObjectId,
        ref:'Category'
    },  
    best_seller:{
      type: Boolean,
      default: false,
    },
    color:
    [
        {
            type:mongoose.Schema.ObjectId,
            ref:'Color' 
        }
    ],
    status:{
        type:Boolean,
        default:true,

    },
        stock:{
        type:Boolean,
        default:true,
    },
},
{
    timestamps:true,
})

const Product = mongoose.model('Product',productSchema)
module.exports = Product;