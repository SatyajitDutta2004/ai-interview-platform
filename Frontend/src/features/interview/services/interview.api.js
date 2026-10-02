import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export async function createInterviewReport({
  title = "Interview Plan",
  jobDescription,
  selfDescription,
  resumeFile,
}) {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("jobDescription", jobDescription);
  formData.append("selfDescription", selfDescription);

  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  const response = await api.post("/api/interview", formData);
  return response.data.interviewReport;
}

export async function getInterviewReports() {
  const response = await api.get("/api/interview");
  return response.data.interviewReports;
}

export async function getInterviewReport(interviewId) {
  const response = await api.get(`/api/interview/${interviewId}`);
  return response.data.interviewReport;
}

export async function downloadInterviewResume(interviewId) {
  const response = await api.get(`/api/interview/${interviewId}/resume/pdf`, {
    responseType: "blob",
  });

  const url = URL.createObjectURL(response.data);
  const link = document.createElement("a");
  link.href = url;
  link.download = `interview-resume-${interviewId}.pdf`;
  link.click();
  URL.revokeObjectURL(url);
}

export async function uploadInterviewResume(interviewId, resumeFile) {
  const formData = new FormData();
  formData.append("resume", resumeFile);

  const response = await api.put(
    `/api/interview/${interviewId}/resume/pdf`,
    formData,
  );
  return response.data;
}
