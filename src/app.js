import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = e();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  e.json({
    limit: "16kb",
  })
);
app.use(
  e.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

app.use(e.static("public"));
app.use(cookieParser());

// routes

import { router as UserRouter } from "./routes/user.routes.js";

app.use("/api/v1/users", UserRouter);
