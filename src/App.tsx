import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import WelcomeScreen from "/Users/vinay/first-vite/src/components/WelcomeScreen.tsx";
import Questionnaire from "/Users/vinay/first-vite/src/components/Questionaire.tsx";
import LoadingScreen from "/Users/vinay/first-vite/src/components/LoadingScreen.tsx";
import MovieResult from "/Users/vinay/first-vite/src/components/MovieResult.tsx"; // Add your MovieResult component

// Define the App component
const App: React.FC = () => {
  const [started, setStarted] = useState<boolean>(false); // State to track if questionnaire started
  const [submitted, setSubmitted] = useState<boolean>(false); // State to track if questionnaire is submitted

  // Handle form submission
  const handleFormSubmit = (): void => {
    setSubmitted(true); // When form is submitted, show the LoadingScreen
  };

  return (
    <Router>
      <Routes>
        {/* Main App route rendering */}
        <Route path="/" element={
          !started ? (
            // Show WelcomeScreen if questionnaire hasn't started
            <WelcomeScreen onStart={() => setStarted(true)} />
          ) : submitted ? (
            // Show LoadingScreen if questionnaire is submitted
            <LoadingScreen />
          ) : (
            // Show Questionnaire component and pass onSubmit prop to handle form submission
            <Questionnaire onSubmit={handleFormSubmit} />
          )
        } />
        {/* Movie Result route */}
        <Route path="/movie-result" element={<MovieResult />} />
      </Routes>
    </Router>
  );
};

export default App;




