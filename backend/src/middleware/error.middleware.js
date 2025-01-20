const notFound=(req,res,next)=>{
   const err=new Error(`not found : ${req.originalUrl}`);
   res.status(400);
   next(err)
}

const errorHandler=(err,req,res,next)=>{
    const statuscode= res.statusCode < 400?500:res.statusCode;

    res.status(statuscode);
    res.json({
      message:err.message,
      stack:process.env.NODE_ENV === "production"?null:err.stack
    })
}

export {notFound,errorHandler};