import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// LoadingScreen component to show a loading spinner while fetching the movie
const LoadingScreen: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/movie-result"); // After 3 seconds, navigate to the movie result page
    }, 3000); // Set the time to 3 seconds (adjustable)

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [navigate]);

  return (
    <div className="loading-screen">
      <h2>Fetching Your Movie...</h2>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;



