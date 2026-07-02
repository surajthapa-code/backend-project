import env from "dotenv";

import { connectDB } from "./database/index.js";

// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";

env.config({
  path: "./env",
});

connectDB();
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
