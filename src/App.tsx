import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen.tsx";
import Questionnaire from "./components/Questionaire.tsx";
import LoadingScreen from "./components/LoadingScreen.tsx";
import MovieResult from "./components/MovieResult.tsx"; // Add your MovieResult component

// Component that handles routing and display logic
const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false); // State to track if questionnaire started
  const navigate = useNavigate(); // Use navigate inside the router context

  // Handle form submission and navigate to movie result page
  const handleFormSubmit = (): void => {
    navigate("/movie-result"); // Navigate directly to the movie result page after form submission
  };

  // Handle the start button click to navigate to the Questionnaire page
  const handleStart = () => {
    setStarted(true); // Set state to start questionnaire
    navigate("/questionnaire"); // Navigate to /questionnaire page
  };

  return (
    <div>
      {/* YouTube Video Background */}
      <video
        className="background-video"
        width="100%"
        height="100%"
        autoPlay
        loop
        muted
      >
        <source src="/Bvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Routes>
        {/* Main App route rendering */}
        <Route
          path="/"
          element={
            !started ? (
              <WelcomeScreen onStart={handleStart} />
            ) : (
              <Questionnaire onSubmit={handleFormSubmit} />
            )
          }
        />
        {/* Questionnaire route */}
        <Route path="/questionnaire" element={<Questionnaire onSubmit={handleFormSubmit} />} />
        {/* Movie Result route */}
        <Route path="/movie-result" element={<MovieResult />} />
      </Routes>
    </div>
  );
};

// Wrap App component with Router to provide routing context
const AppWithRouter: React.FC = () => {
  return (
    <Router>  {/* Wrap the entire App in Router */}
      <App />
    </Router>
  );
};

export default AppWithRouter;










