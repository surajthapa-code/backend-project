import env from "dotenv";
import { connectDB } from "./database/index.js";
import { app } from "./app.js";

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

env.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`listning on PORT: ${process.env.PORT}`);
    });
    app.on("Error", (err) => {
      console.log("error while starting server", err);
    });
  })
  .catch((err) => {
    console.log("monogo db connection failed", err);
  });
//----------->
//Normal approach

// import e from "express";
// const app = e()(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
//     app.on("error", (err) => {
//       console.log("error dude: ", err);
//       throw err;
//     });
//     app.listen(process.env.PORT, () => {
//       console.log(`listening on port ${process.env.PORT}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// })();

//-------------->
