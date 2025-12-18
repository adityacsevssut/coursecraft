import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";

const API_BASE = "http://localhost:4000";

const VerifyPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  useEffect(() => {
    let cancelled = false;

    const verifyAndRedirect = async () => {
      const params = new URLSearchParams(location.search || "");
      const rawSession = params.get("session_id");
      const session_id = rawSession ? rawSession.trim() : null;
      const payment_status = params.get("payment_status");

      // If user cancelled on Stripe -> go back to checkout
      if (payment_status === "cancel") {
        if (!cancelled) navigate("/checkout", { replace: true });
        return;
      }

      if (!session_id) {
        // no session id -> treat as failed verify
        if (!cancelled)
          navigate("/mycourses?payment_status=Unpaid", { replace: true });
        return;
      }

      // try to get Clerk token (if available)
      let clerkToken = null;
      try {
        clerkToken = await getToken();
      } catch (e) {
        clerkToken = null;
      }

      const headers = {};
      if (clerkToken) headers["Authorization"] = `Bearer ${clerkToken}`;

      try {
        const res = await axios.get(`${API_BASE}/api/booking/confirm`, {
          params: { session_id },
          headers,
          withCredentials: true, // ensure cookies sent for server getAuth
          timeout: 15000,
        });

        if (!cancelled) {
          if (res?.data?.success) {
            // success -> redirect to user's courses/bookings
            navigate("/mycourses?payment_status=Paid", { replace: true });
          } else {
            // backend responded but reported failure
            navigate("/my-courses?payment_status=Unpaid", { replace: true });
          }
        }
      } catch (err) {
        // On any error redirect to failure route (you can adjust)
        if (!cancelled)
          navigate("/mycourses?payment_status=Unpaid", { replace: true });
      }
    };

    verifyAndRedirect();

    return () => {
      cancelled = true;
    };
  }, [location.search, navigate, getToken]);

  // no UI — returns null so nothing is rendered
  return null;
};

export default VerifyPaymentPage;