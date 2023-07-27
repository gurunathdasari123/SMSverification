require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const  registerData=require('./models/register')


app.use(express.json())


mongoose.connect(process.env.mongoURL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log('mongoDB connected')
})
.catch((error)=>{mongoURL
    console.log('error in mongodb connection')
})

app.post('/',async (req,res)=>{
const newUser=new registerData({
    name:req.body.name,
    password:req.body.password,
    email:req.body.email,
})
try{
  const  existUser=await registerData.findOne({$or:[{name:req.body.name},{email:req.body.email}]})
  if(existUser){
    res.status(400).json({message:'username or email already exist'})
  }else{
    const user=await newUser.save()
    res.status(201).json(user)
  }

}catch(err){
res.status(500).json('error in the condition of save the data in mongodb')
}
})

app.listen(3000)