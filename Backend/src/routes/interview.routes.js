const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");

const interviewController = require("../controllers/interview.controller");

const upload = require("../middlewares/file.middleware");

const interviewRouter = express.Router();

/**
 * @route POST/api/interview/
 * @description generate new introview report on the basis of the user self description,resume pdf and job description.
 * @access private
 *
 */
interviewRouter.post(
  "/",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.generateInterViewReportController,
);
interviewRouter.get(
  "/",
  authMiddleware.authUser,
  interviewController.getInterviewReportsController,
);
interviewRouter.get(
  "/:interviewId",
  authMiddleware.authUser,
  interviewController.getInterviewReportController,
);
interviewRouter.get(
  "/:interviewId/resume",
  authMiddleware.authUser,
  interviewController.getInterviewResumeController,
);
interviewRouter.get(
  "/:interviewId/resume/pdf",
  authMiddleware.authUser,
  interviewController.getInterviewResumePdfController,
);
interviewRouter.put(
  "/:interviewId/resume/pdf",
  authMiddleware.authUser,
  upload.single("resume"),
  interviewController.uploadInterviewResumePdfController,
);
interviewRouter.post(
  "/resume/pdf/:interviewId",
  authMiddleware.authUser,
  interviewController.getInterviewResumePdfController,
);

module.exports = interviewRouter;
