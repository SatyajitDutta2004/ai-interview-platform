// require("dotenv").config();
// const app = require("./src/app");
// const connectToDB = require("./src/config/database");

// connectToDB();
// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });

// require("dotenv").config();

// const app = require("./src/app");
// const connectToDB = require("./src/config/database");
// const {
//   resume,
//   selfDescription,
//   jobDescription,
// } = require("./src/services/temp");
// const generateInterviewReport = require("./src/services/ai.service");
// const invokeGeminiAi = require("./src/services/ai.service");

// connectToDB();
// invokeGeminiAi();

// generateInterviewReport({ resume, selfDescription, jobDescription });

// app.listen(3000, () => {
//   console.log("server is running on port 3000");
// });

require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");

// const {
//   resume,
//   selfDescription,
//   jobDescription,
// } = require("./src/services/temp");

// const generateInterviewReport = require("./src/services/ai.service");

const port = process.env.PORT || 3000;

connectToDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
