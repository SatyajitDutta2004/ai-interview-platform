const pdfParse = require("pdf-parse");

const { generateInterviewReport } = require("../services/ai.service");

const interviewReportModel = require("../models/interviewReport.model");

async function generateInterViewReportController(req, res) {
  const { title, selfDescription, jobDescription } = req.body;

  if (!jobDescription || (!req.file && !selfDescription)) {
    return res.status(400).json({
      message:
        "jobDescription and either a resume or selfDescription are required.",
    });
  }

  let resumeText = "";
  if (req.file) {
    const resumeContent = await new pdfParse.PDFParse(
      Uint8Array.from(req.file.buffer),
    ).getText();
    resumeText = resumeContent.text;
  }

  const interViewReportByAi = await generateInterviewReport({
    resume: resumeText,
    selfDescription,
    jobDescription,
  });

  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    title,
    jobDescription,
    resume: resumeText,
    resumePdf: req.file?.buffer,
    selfDescription,
    ...interViewReportByAi,
  });

  res.status(201).json({
    message: "Interview report generated sucessfully.",
    interviewReport,
  });
}

async function getInterviewReportsController(req, res) {
  const interviewReports = await interviewReportModel
    .find({ user: req.user.id })
    .sort({ createdAt: -1 });

  res.status(200).json({ interviewReports });
}

async function getInterviewReportController(req, res) {
  const interviewReport = await interviewReportModel.findOne({
    _id: req.params.interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report not found." });
  }

  res.status(200).json({ interviewReport });
}

async function getInterviewResumeController(req, res) {
  const interviewReport = await interviewReportModel.findOne({
    _id: req.params.interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report not found." });
  }

  res
    .type("text/plain")
    .send(interviewReport.resume || "No resume was uploaded.");
}

async function getInterviewResumePdfController(req, res) {
  const interviewReport = await interviewReportModel.findOne({
    _id: req.params.interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report not found." });
  }

  if (!interviewReport.resumePdf) {
    return res.status(404).json({
      message: "Original resume PDF is not available. Upload the resume again.",
    });
  }

  res
    .type("application/pdf")
    .set(
      "Content-Disposition",
      `attachment; filename="resume-${req.params.interviewId}.pdf"`,
    )
    .send(interviewReport.resumePdf);
}

async function uploadInterviewResumePdfController(req, res) {
  if (!req.file) {
    return res.status(400).json({ message: "Choose a PDF resume to upload." });
  }

  if (req.file.buffer.subarray(0, 5).toString("ascii") !== "%PDF-") {
    return res
      .status(400)
      .json({ message: "The uploaded file is not a valid PDF." });
  }

  const interviewReport = await interviewReportModel.findOne({
    _id: req.params.interviewId,
    user: req.user.id,
  });

  if (!interviewReport) {
    return res.status(404).json({ message: "Interview report not found." });
  }

  interviewReport.resumePdf = req.file.buffer;
  await interviewReport.save();

  res.status(200).json({ message: "Resume PDF uploaded successfully." });
}

module.exports = {
  generateInterViewReportController,
  getInterviewReportsController,
  getInterviewReportController,
  getInterviewResumeController,
  getInterviewResumePdfController,
  uploadInterviewResumePdfController,
};
