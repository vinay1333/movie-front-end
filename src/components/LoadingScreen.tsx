import React, { useEffect, useState } from "react";

const LoadingScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Simulate the 3-second wait
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // After 3 seconds, stop showing the loading screen
    }, 3000); // Set timeout for 3 seconds

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, []);

  return (
    <div className="loading-screen">
      {isLoading ? (
        <>
          <h2>Fetching Your Movie...</h2>
          <div className="spinner"></div> {/* You can add a CSS spinner here */}
        </>
      ) : (
        <div>Loading complete, transitioning to movie details...</div> // Optional message after 3 seconds
      )}
    </div>
  );
};

export default LoadingScreen;









