import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, CSRF_TOKEN } from "../../constants"; // Assuming you have the CSRF token stored
import { BASE_URL } from "../../hooks/useFetch";
import api from "../../services/api";
import Loader from "../common/loader";

interface ProtectedRouteProp {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProp) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) {
          handleUnauthorized();
          return;
        }

        const response = await api.post(
          `${BASE_URL}/auth/verify`,
          { token: accessToken },
          {
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
              "X-CSRFTOKEN": CSRF_TOKEN || "",
            },
          }
        );

        if (response.status === 200) {
          setIsAuthorized(true);
        } else {
          handleUnauthorized();
        }
      } catch (error) {
        console.error("Authentication error:", error);
        handleUnauthorized();
      }
    };

    const handleUnauthorized = () => {
      setIsAuthorized(false);
      navigate("/login");
    };

    authenticateUser();
  }, [navigate]);

  if (isAuthorized === null) {
    return (
      <div className="grid place-items-center h-screen">
        <Loader />
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
}

export default ProtectedRoute;
