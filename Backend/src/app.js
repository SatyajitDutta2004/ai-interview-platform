const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const allowedOrigins = [
  process.env.FRONTEND_URL,
  /^http:\/\/localhost:517[34]$/,
].filter(Boolean);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
// require all the router herw
const authRouter = require("./routes/auth.routes");
const interviewRouter = require("./routes/interview.routes");
// using all the router here
app.use("/api/auth", authRouter);
app.use("/api/interview", interviewRouter);

module.exports = app;
