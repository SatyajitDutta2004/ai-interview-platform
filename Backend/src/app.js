const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: /^http:\/\/localhost:517[34]$/,
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
