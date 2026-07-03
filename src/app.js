import e from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = e();
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
app.use()
export { app };
