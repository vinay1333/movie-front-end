import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import WelcomeScreen from "/Users/vinay/first-vite/src/components/WelcomeScreen.tsx";
import Questionnaire from "/Users/vinay/first-vite/src/components/Questionaire.tsx";
import LoadingScreen from "/Users/vinay/first-vite/src/components/LoadingScreen.tsx";
import MovieResult from "/Users/vinay/first-vite/src/components/MovieResult.tsx"; // Add your MovieResult component

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
        <iframe
          className="background-video"
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/xBasQG_6p40?start=30&autoplay=1&mute=1&loop=1&playlist=xBasQG_6p40"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          ></iframe>

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






