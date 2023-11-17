import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { getLocal } from "utils";

const ProtectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const navigate = useNavigate();
    const isAuthenticated = getLocal("token");
    const isOnBoarded = getLocal("onboarding");

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/auth");
      } else if (!isOnBoarded) {
        navigate("/onboarding");
      }
    }, [navigate, isAuthenticated, isOnBoarded]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    }

    // Render loading state or error message if needed
    return (
      <div className="body-overlay">
        <Spinner isLoading={true} />
      </div>
    );
  };

  return Wrapper;
};

export default ProtectedRoute;
