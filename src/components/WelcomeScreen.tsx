import React from "react";

// Define the props that this component expects
interface WelcomeScreenProps {
  onStart: () => void; // A function that runs when the "Get Started" button is clicked
}

// Define the WelcomeScreen component as a function component (React.FC)
const WelcomeScreen: React.FC<WelcomeScreenProps> = function (props) {
  return (
    <div className="welcome-screen">
      <h1>Welcome to Movie Guru</h1>
      <p>Answer a few questions to get a movie recommendation!</p>
      
      {/* Button to start the questionnaire */}
      <button onClick={props.onStart} className="start-button">
        Get Started
      </button>
    </div>
  );
};

// Export the component so it can be used in other files
export default WelcomeScreen;


