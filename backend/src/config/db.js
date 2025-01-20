import mongoose from 'mongoose'
const dbName='nexText';
const connectDB=async()=>{
   try {
      const connect=await mongoose.connect(
         `${process.env.MONGO_URI2}${dbName}`
      )
      return connect;
   } catch (error) {
      console.error(`Database connection error: ${error}`)
      process.exit(1);
   } 
}

export default connectDB 