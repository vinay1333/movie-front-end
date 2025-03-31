import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen.tsx"; // Import loading animation

const MovieResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get movies passed from Questionnaire
  const movies = location.state?.movies || [];
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Select a random movie when component mounts
  useEffect(() => {
    if (movies.length > 0) {
      selectRandomMovie();
    } else {
      setLoading(false);
    }
  }, [movies]);

  const selectRandomMovie = () => {
    if (movies.length > 0) {
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);
    }
    setLoading(false);
  };

  const handleRegenerate = () => {
    setLoading(true);
    selectRandomMovie();
  };

  const handleStartAgain = () => {
    navigate("/");
  };

  return (
    <div className="movie-result">
      {loading ? (
        <LoadingScreen />
      ) : movie ? (
        <div>
          <h2>Movie Recommendation</h2>
          <p>Title: {movie.title}</p>
          <p>Genre: {movie.categoryId}</p>
          <p>Duration: {movie.length} minutes</p>
          <p>Rating: {movie.rating}</p>
          <p>Release Year: {movie.releaseYear}</p>

          <div>
            <button onClick={handleRegenerate}>Regenerate</button>
            <button onClick={handleStartAgain}>Start Again</button>
          </div>
        </div>
      ) : (
        <div>No movies found. Please try again.</div>
      )}
    </div>
  );
};

export default MovieResult;
















