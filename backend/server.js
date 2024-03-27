const app = require("./App");
const connectdb = require("./database.js");
const dotevn = require("dotenv");
// Uncaught exception is due to error in the code like undefined variable or syntax errors etc...
// console.log(mussafara)
process.on("uncaughtException", (err) => {
  console.log("error", err.message);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});
dotevn.config({ path: "backend/config/config.env" });
connectdb();
// console.log(Mussfara)

const server = app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running", process.env.PORT);
});
// UnHandled promise rejection is due to error in the mongoDB string
process.on("unhandledRejection", (err, promise) => {
  console.log("error in the string");
  server.close(() => process.exit(1));
});
