import React from "react";
import { useNavigate } from "react-router-dom";

// Define the props that this component expects
interface WelcomeScreenProps {
  onStart: () => void; // Function that runs when "Get Started" is clicked
}

// Define the WelcomeScreen component
const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="welcome-screen">
      <h1>Welcome to Movie Guru</h1>
      <p>Answer a few questions to get a movie recommendation!</p>
      
      {/* Button to start the questionnaire */}
      <button onClick={onStart} className="start-button">
        Get Started
      </button>

      {/* Button to go to Movies List */}
      <button onClick={() => navigate("/actors")} className="start-button">
        View Actors
      </button>
    </div>
  );
};

export default WelcomeScreen;



