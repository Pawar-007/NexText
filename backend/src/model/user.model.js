import mongoose, { Mongoose } from "mongoose";
import bcrypt from 'bcrypt';
const userModel=mongoose.Schema({
   name:{type:String,
      require:true,
      default: function() {
      return `Guest_${Math.floor(Math.random() * 9000 + 1000)}`
    }
   },
   email:{
      type:String,
      required:function() { return !this.isGuest },
      unique:true,
      sparse: true
   },
   password:{
      type:String,
      required:function() { return !this.isGuest },
      unique:true},
   pic:{
      type:String,
   },
   isGuest: { type: Boolean, default: false },
   guestExpiresAt: { type: Date }
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
