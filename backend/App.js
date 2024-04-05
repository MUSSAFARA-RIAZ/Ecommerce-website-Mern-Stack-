const express=require("express")
const app=express()
// const erromiddleware=require("./middleware/error")
const errorMiddleWare=require("../backend/middleware/error")
const cookieParser = require("cookie-parser")

app.use(express.json())
app.use(cookieParser())





const product=require("../backend/routes/Product.route")
const user=require("../backend/routes/userroute")

app.use('/api/v1',product)
app.use('/api/v1',user)
// app.use(erromiddleware)
app.use(errorMiddleWare)







module.exports=app
