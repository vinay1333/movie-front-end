import React, { useEffect, useState } from "react";

// MovieResult component fetches and displays movie details
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
        const response = await fetch("http://localhost:8080/films"); // API call to fetch films
        if (!response.ok) {
          throw new Error("Failed to fetch movies"); // Handle unsuccessful response
        }
        const movies = await response.json(); // Parse the response as JSON
        if (movies.length > 0) {
          // Randomly select a movie if available
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];
          setMovie(randomMovie); // Set the selected movie
        } else {
          setError("No movies found."); // Error handling if no movies are returned
        }
      } catch (error: unknown) {
        // Type assertion here to let TypeScript know we're working with an Error
        if (error instanceof Error) {
          setError("Error fetching movies: " + error.message); // Handle fetch error
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false); // Set loading to false when fetch is done
      }
    };

    fetchMovie();
  }, []); // Empty dependency array ensures this runs only once after the component mounts

  const handleRegenerate = () => {
    setLoading(true);
    setError(null);
    setMovie(null); // Clear current movie state when regenerating
    // Trigger a new fetch when the "Regenerate" button is clicked
    const fetchMovie = async () => {
      try {
        const response = await fetch("http://localhost:8080/films");
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
    // Redirect to the Welcome Screen
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
            <p>Genre: {movie.categoryId}</p> {/* Example: Update to actual category name */}
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








