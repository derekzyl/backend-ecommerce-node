const {Category} = require('../models/category')
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')






 router.post('/', async(req, res)=>{
let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color    
})
category = await category.save()

if (!category){
   return res.status(500).json({
        error:error,
        success: false
    }).send('the category cannot be created')}
    res.status(201).json(category).send(category )


 })
 router.put('/:id', async(req, res)=>{
     if (!mongoose.isValidObjectId(req.params.id)){
         res.status(400).json({
             success:false,
             message: "invalid  id",
             error: err
         })
     }

    const neoCat = await Category.findByIdAndUpdate(
         req.params.id,{
            name:req.body.name,
            icon: req.body.icon,
            color: req.body.color
        },{new: true}
         
    )
    
    if(!neoCat){
        res.status(500).json({
            success: false,
            message: 'invalid id' 
        })
    }  
    res.status(200).send(neoCat)
     })
    
 router.get('/',async(req, res)=>{

    const categoryList = await Category.find()
    if(!categoryList){
        res.status(500).json({
            success: false,
            error: error
        })
    }
    res.send(categoryList)
    })
    
    
 
 router.get('/:id', async(req, res)=>{
    let singleCategory= req.params.id
    newCategory =await Category.findById(singleCategory)

    if(!newCategory){
        res.status(404).json({
            status: false,
            message: 'user not found'
        })
    }
    res.status(201).send(newCategory  )
})



 router.delete('/:id',(req, res)=>{
Category.findByIdAndDelete(req.params.id)
.then((categorys)=>{
    if (categorys){
     return  res.status(200).json({
         success:true,
         message: 'category successfully deleted'
     })
     
    }
   else {
       return res.status(404).json({
           success: false,
           message: 'category not found'
       })
   }
})
.catch((err)=>{
res.status(400).json({
    success: false,
    error: err
})
})

 })


module.exports = router