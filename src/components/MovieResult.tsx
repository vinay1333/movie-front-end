import React, { useEffect, useState } from "react";
import { API_URL } from "../config.ts"; // Import the API_URL from config.ts

const MovieResult: React.FC = () => {
  // Movie state to hold movie details
  const [movie, setMovie] = useState<any | null>(null);
  // Loading state to manage fetch process
  const [loading, setLoading] = useState<boolean>(true);
  // Error state to handle any errors during fetch
  const [error, setError] = useState<string | null>(null);

  // Fetch movie data when the component is mounted
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_URL}/films`); // Use API_URL dynamically
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const movies = await response.json();
        if (movies.length > 0) {
          // Randomly select a movie if available
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setMovie(randomMovie);
        } else {
          setError("No movies found.");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError("Error fetching movies: " + error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, []); // Run only once after component mounts

  const handleRegenerate = () => {
    setLoading(true);
    setError(null);
    setMovie(null);
    const fetchMovie = async () => {
      try {
        const response = await fetch(`${API_URL}/films`);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const movies = await response.json();
        if (movies.length > 0) {
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setMovie(randomMovie);
        } else {
          setError("No movies found.");
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError("Error fetching movies: " + error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  };

  const handleStartAgain = () => {
    window.location.href = "/";
  };

  return (
    <div className="movie-result">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        movie && (
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
        )
      )}
    </div>
  );
};

export default MovieResult;










