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
   }
},{ timestamps: true })

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
