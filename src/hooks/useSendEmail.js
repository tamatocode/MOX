"use client";
import { sendEmail } from "@/app/_actions.js/sendEmail";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

function useSendEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const sendEmailAction = async ({ from, to, subject, html }) => {
    setLoading(true); 
    setError(null); 

    try {
      const result = await sendEmail({ from, to, subject, html }); 

      if (!result.success) {
        throw new Error(result.error);
      }

      setResponse(result.data);
      toast.success("RecurX has been informed.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return result.data;
    } catch (error) {
      setError(error.message || "Failed to send email");
      toast.warn("Failed to inform RecurX.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      throw error; 
    } finally {
      setLoading(false); 
    }
  };

  return { sendEmail: sendEmailAction, loading, error, response };
}

export default useSendEmail;

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}