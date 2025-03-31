import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen.tsx"; // Import loading animation

const MovieResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Category mapping
  const categoryMap: { [key: string]: string } = {
    '1': 'Action',
    '2': 'Animation',
    '3': 'Children',
    '4': 'Classics',
    '5': 'Comedy',
    '6': 'Documentary',
    '7': 'Drama',
    '9': 'Foreign',
    '11': 'Horror',
    '14': 'Sci-Fi',
    '15': 'Sports',
    '16': 'Travel',
  };

  // Get movies passed from Questionnaire
  const movies = location.state?.movies || [];
  const [movie, setMovie] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showCast, setShowCast] = useState<boolean>(false);
  const [cast, setCast] = useState<any[]>([]);
  const [loadingCast, setLoadingCast] = useState<boolean>(false);

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
    setShowCast(false); // Hide cast when regenerating
    selectRandomMovie();
  };

  const handleStartAgain = () => {
    navigate("/");
  };

  const toggleCast = async () => {
    if (!showCast) {
      setLoadingCast(true);
      try {
        const response = await fetch(`http://localhost:8080/films/${movie.id}/actors`);
        if (!response.ok) {
          throw new Error("Failed to fetch cast data");
        }
        const data = await response.json();
        setCast(data);
      } catch (error) {
        console.error("Error fetching cast:", error);
        setCast([]);
      } finally {
        setLoadingCast(false);
      }
    }
    setShowCast(!showCast);
  };

  // Get the genre name from the category ID
  const genreName = movie?.categoryId ? categoryMap[movie.categoryId] : "Unknown";

  return (
    <div className="movie-result">
      {loading ? (
        <LoadingScreen />
      ) : movie ? (
        <div>
          <h2>Movie Recommendation</h2>
          <p>Title: {movie.title}</p>
          <p>Genre: {genreName}</p> {/* Display the genre name instead of the ID */}
          <p>Duration: {movie.length} minutes</p>
          <p>Rating: {movie.rating}</p>
          <p>Release Year: {movie.releaseYear}</p>

          {/* Cast Button */}
          <div>
            <button onClick={toggleCast}>
              {showCast ? "Hide Cast" : "Show Cast"}
            </button>
          </div>

          {/* Show Cast Section */}
          {showCast && (
            <div className="cast-container">
              {loadingCast ? (
                <p>Loading cast...</p>
              ) : cast.length > 0 ? (
                <div>
                  <h3>Cast</h3>
                  <ul className="cast-list">
                    {cast.map((actor) => (
                      <li key={actor.id}>
                        {actor.firstName} {actor.lastName}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>No cast information available.</p>
              )}
            </div>
          )}

          {/* Buttons: Regenerate & Start Again */}
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





















