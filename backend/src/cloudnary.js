import cloudinary from 'cloudinary';
import { asyncHandler } from './utils/async-handler.js';
import fs from 'fs/promises'
import dotenv from 'dotenv';
dotenv.config(); // This should be at the top of your file

cloudinary.config({
   cloud_name:process.env.CLOUDNARY_NAME,
   api_key: process.env.API_KEY,
   api_secret: process.env.API_SECRET
})

   const uploadImage=asyncHandler(async(lacalPath)=>{
      try {
      const uploaded=await cloudinary.v2.uploader.upload(lacalPath,{
         chunk_size:80000000,
         resource_type:'image'
      });
      await fs.unlink(lacalPath);
      console.log("image ",uploaded);
      return uploaded.secure_url;
      
      } catch (error) {
         console.error("❌ Error uploading image:", error);
         throw new Error('Upload failed');
      }
   });

export {uploadImage};