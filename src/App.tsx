import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import WelcomeScreen from "./components/WelcomeScreen.tsx";
import Questionnaire from "./components/Questionaire.tsx";
import LoadingScreen from "./components/LoadingScreen.tsx";
import MovieResult from "./components/MovieResult.tsx"; // Add your MovieResult component

const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false); // State to track if questionnaire started
  const [submitted, setSubmitted] = useState<boolean>(false); // State to track if questionnaire is submitted

  // Handle form submission
  const handleFormSubmit = (): void => {
    setSubmitted(true); // When form is submitted, show the LoadingScreen
  };

  return (
    <Router>
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
          <Route path="/" element={
            !started ? (
              <WelcomeScreen onStart={() => setStarted(true)} />
            ) : submitted ? (
              <LoadingScreen />
            ) : (
              <Questionnaire onSubmit={handleFormSubmit} />
            )
          } />
          {/* Movie Result route */}
          <Route path="/movie-result" element={<MovieResult />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;






