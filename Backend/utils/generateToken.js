const jWt = require('jsonwebtoken')
const generateToken =(token)=>{
    return jWt.sign({ token }, process.env.JWT_key,{expiresIn:'2d'})
}
module.exports= generateToken