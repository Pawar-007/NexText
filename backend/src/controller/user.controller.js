import User from "../model/user.model.js";
import { asyncHandler } from "../utils/async-handler.js";
import { generateToken } from "../config/generateToken.js";
import { uploadImage } from "../cloudnary.js";
const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;

    const picture=req.files && req.files.picture ? req.files.picture[0] : null; 
    
    if(!name || !email || !password){
      res.status(401); 
      throw new Error("please enter all the fields ");
    }
 
    const useExist=await User.findOne({ email });

    if(useExist){
      res.status(401)
      throw new Error("user allready exist ");
    }
    
  let picUrl= "https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1736782220~exp=1736785820~hmac=83b6fba559704f18b00505d6ebb6bc3ce5c61af566c6750f289c15c896787430&w=740"; // Default image URL
  //  if (picture && picture.path) {
  //     picUrl = await uploadImage(picture.path); 
  //     console.log("picUrl after upload:", picUrl);  
  //  }
    // if(!picUrl){
    //   throw new Error("image in uploded on cloudnary")
    // }
    let user= await User.create({ 
      name,
      email,
      password,
      pic:picUrl, 
    })
    if(user){
      res.status(200).json({
         _id:user._id,
         name:user.name,
         pic:user.pic,
         token:generateToken(user._id)
      })
    }
    else{
      res.status(400)
      throw new Error("failed to create user ");
    }
});

const login=asyncHandler(async(req,res)=>{
     const {email,password}=req.body;
     console.log("email ",email);
     if(!email || !password){
      res.status(401)
      throw new Error("invalid crediantial");
     }
     const user=await User.findOne({email});
     if(!user){
      res.status(400).json({"message":"user not found "});
     }

     const pass=await user.isPasswordCorrect(password);
     if(!pass){
      res.status(400).json({"message":"invalid password"})
      throw new Error(error);
     }
  
     return res.status(200)
     .json({
         _id:user._id,
         name:user.name,
         pic:user.pic,
         email:user.email,
         token:generateToken(user._id)
     })
})
// /api/user?user=bhushan
const alluser=asyncHandler(async(req,res,)=>{
  //console.log("query ",req.query);
    const search=req.query.search?.trim();
    const key=search?
    {
      $or:[
    { name: { $regex: req.query.search, $options: 'i' } }, // Name starts with 'A'
    { email: { $regex: req.query.search, $options: 'i' } } // Email ends with 'example.com'
  ] 
    }:{}
    //console.log("key ",JSON.stringify(key, null, 2));
    const user=await User.find(key).find({_id:{$ne:req.user._id}}).select("-password");
    return res.send(user); 

})
export {registerUser,login,alluser};