const mongoose=require("mongoose")




 const connectDB = async () => {

  const connectionInstance=await mongoose.connect(`${process.env.MongoDbURL}/${process.env.DB_NAME}`);
  // const connectionInstance=await mongoose.connect("mongodb+srv://riazmussafara:mussafara123@cluster0.yhvfvvz.mongodb.net/mussafaradb");
    console.log("Express server is running on port",`${process.env.PORT}`);
    console.log(`Database connected successfully, ${connectionInstance.connection.host}`);
  
 
};
module.exports = connectDB;