const mongoose = require('mongoose')


let productSchema =  mongoose.Schema({
    
    name: {
        type:String,
        required :true
    },
describe:{
    type:String,
    required:false
},
description:{
    type: String,
    default:'',

},
richDescription: { 
type: String,
default: ''
},
image:{type:String,
required:false},
images:[{
    type: String,
}],
brand:{type:String,
default:''},
price: {type:Number,
default: 0},

category:{type: mongoose.Schema.Types.ObjectId,
ref: 'Category',
required: true},  
// category:{
//     type: String,
// },
countInStock:{
    type: Number,
    required: true,
    min:0,
    max:255

},
rating:{type:Number, 
default:0},
numReviews:{type:Number,
default:0},
isFeatured:{type:Boolean,
default:false},
dateCreated:{type:Date,
default:Date.now}

    
});


productSchema.virtual('id').get(function (){
return this._id.toHexString();
 });

 productSchema.set('toJSON', {
     virtuals:true
 });



 module.exports = mongoose.model('Product', productSchema );
 