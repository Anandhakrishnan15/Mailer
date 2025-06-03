const express = require('express')
const cors = require('cors')
require('dotenv').config();

const app=express();

app.use(cors());
app.use(express.json());


// Allow CORS from your frontend URL
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL in production
    credentials: true, // if you're sending cookies or auth headers
}));

const router =require('./router/main')
app.use('/',router)

const PORT =process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running in ${PORT}`);
    
})