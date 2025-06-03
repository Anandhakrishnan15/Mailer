const express= require("express")
const router =express.Router()

router.get('/',(req,res)=>{
    res.json({message:'Bellow this is backend'});
})    

module.exports =router