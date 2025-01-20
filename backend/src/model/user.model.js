import mongoose, { Mongoose } from "mongoose";
import bcrypt from 'bcrypt';
const userModel=mongoose.Schema({
   name:{type:String,require:true},
   email:{
      type:String,
      require:true,
      unique:true,
   },
   password:{
      type:String,
      require:true,
      unique:true},
   pic:{
      type:String,
      require:true,
      default:"https://img.freepik.com/free-psd/contact-icon-illustration-isolated_23-2151903337.jpg?t=st=1736782220~exp=1736785820~hmac=83b6fba559704f18b00505d6ebb6bc3ce5c61af566c6750f289c15c896787430&w=740"
   }
},{
   timestamps:true
})

userModel.pre("save",async function(next){
     try {
       if(!this.isModified("password")){
         return next();
       }

       this.password= await bcrypt.hash(this.password,10);
       next();
     } catch (error) {
      next(error);
     }
})

userModel.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password,this.password);
}


const User=mongoose.model("User",userModel);

export default User;
