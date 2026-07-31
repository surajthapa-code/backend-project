import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = e();
app.use(
  cors({
    origin: "proces.env.CORS_ORIGIN",
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
