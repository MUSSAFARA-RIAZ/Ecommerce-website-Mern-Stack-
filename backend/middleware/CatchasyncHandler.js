module.exports=catchasyncHandlerfunc=> (req,res,next)=>{
    Promise.resolve(catchasyncHandlerfunc(req,res,next)).catch(next)
}