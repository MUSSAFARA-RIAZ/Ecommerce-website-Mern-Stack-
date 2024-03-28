const express=require("express")
const app=express()
// const erromiddleware=require("./middleware/error")
const errorMiddleWare=require("../backend/middleware/error")

app.use(express.json())




const product=require("../backend/routes/Product.route")
app.use('/api/v1',product)
// app.use(erromiddleware)
app.use(errorMiddleWare)







module.exports=app
