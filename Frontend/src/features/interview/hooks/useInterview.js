import {
  getInterviewReports,
  createInterviewReport,
  getInterviewReport,
  downloadInterviewResume,
  uploadInterviewResume,
} from "../services/interview.api";
import { useCallback, useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";
import { useParams } from "react-router";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { interviewId } = useParams();

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } =
    context;

  const generateReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    setLoading(true);
    let response = null;
    try {
      response = await createInterviewReport({
        title: "Interview Plan",
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response;
  };

  const getReportById = useCallback(
    async (interviewId) => {
      setLoading(true);
      setReport(null);
      let response = null;
      try {
        response = await getInterviewReport(interviewId);
        setReport(response);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
      return response;
    },
    [setLoading, setReport],
  );

  const getReports = useCallback(async () => {
    setLoading(true);
    let response = null;
    try {
      response = await getInterviewReports();
      setReports(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    return response;
  }, [setLoading, setReports]);

  const getResumePdf = async (interviewReportId) => {
    setLoading(true);
    try {
      await downloadInterviewResume(interviewReportId);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadResumePdf = (interviewReportId, resumeFile) =>
    uploadInterviewResume(interviewReportId, resumeFile);

  useEffect(() => {
    if (!interviewId) {
      getReports();
    }
  }, [interviewId, getReportById, getReports]);

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    getResumePdf,
    uploadResumePdf,
  };
};
