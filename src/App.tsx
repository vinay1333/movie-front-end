import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import WelcomeScreen from "./components/WelcomeScreen.tsx";
import Questionnaire from "./components/Questionaire.tsx";
import MovieResult from "./components/MovieResult.tsx";
import Actors from "./components/Actors.tsx";

// Component that handles routing and display logic
const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false);
  const navigate = useNavigate(); // Hook for navigation

  // Handle the start button click to navigate to the Questionnaire page
  const handleStart = () => {
    setStarted(true);
    navigate("/questionnaire"); // Navigate to questionnaire
  };

  return (
    <div>
      {/* Video Background */}
      <video className="background-video" width="100%" height="100%" autoPlay loop muted>
        <source src="/Bvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <Routes>
        {/* Home Route */}
        <Route path="/" element={<WelcomeScreen onStart={handleStart} />} />
        
        {/* Questionnaire Route */}
        <Route path="/questionnaire" element={<Questionnaire />} />
        
        {/* Movie Result Route */}
        <Route path="/movie-result" element={<MovieResult />} />
        
        {/* Movies List Route */}
        <Route path="/actors" element={<Actors />} />
      </Routes>
    </div>
  );
};

// Wrap App component with Router to provide routing context
const AppWithRouter: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;











