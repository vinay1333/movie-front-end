import React from "react";

const MovieResult: React.FC = () => {

  const handleRegenerate = () => {
    // Logic to fetch a new movie (you may need to implement state management here)
    console.log("Regenerating movie...");
    // For now, reload the page to simulate picking a new movie
    window.location.reload();
  };

 const handleStartAgain = () => {
  window.location.href = "/"; // Full reload ensures state resets
};


  return (
    <div className="movie-result">
      <h1>🎬 Your Movie Recommendation</h1>
      <p className="description">Enjoy watching this movie!</p>
      {/* Example placeholder movie details */}
      <p><strong>Title:</strong> Example Movie</p>
      <p><strong>Genre:</strong> Action</p>
      <p><strong>Duration:</strong> 120 mins</p>

      <div className="button-group">
        <button className="regenerate-button" onClick={handleRegenerate}>
          Regenerate
        </button>
        <button className="start-again-button" onClick={handleStartAgain}>
          Start Again
        </button>
      </div>
    </div>
  );
};

export default MovieResult



