import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";

// Define the structure for the questions
const questions = [
  { id: 1, question: "What genre would you like to watch?", options: ["Action", "Animation", "Children", "Classics", "Comedy", "Documentary", "Drama", "Foreign", "Horror", "Sci-Fi", "Sports", "Travel", "Any"] },
  { id: 2, question: "How much time do you have?", options: ["Not much (Under 1 hour)", "Decent amount (1-2 hours)", "I'm chilling (Over 2 hours)"] },
  { id: 3, question: "Do you have a preferred age rating?", options: ["G", "PG", "PG-13", "NC-17", "R", "Any"] },
  { id: 4, question: "Desired time period?", options: ["2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "Any"] },
  { id: 5, question: "What Language would you like to watch in?", options: ["English", "Italian", "Japanese", "Mandarin", "French", "German", "Any"] },
];

// Mappings to convert answers to API query params
const genreMap: Record<string, number | null> = {
  "Action": 1, "Animation": 2, "Children": 3, "Classics": 4, "Comedy": 5,
  "Documentary": 6, "Drama": 7, "Foreign": 9, "Horror": 11,
  "Sci-Fi": 14, "Sports": 15, "Travel": 16, "Any": null
};

const durationMap: Record<string, number | null> = {
  "Not much (Under 1 hour)": 0,
  "Decent amount (1-2 hours)": 1,
  "I'm chilling (Over 2 hours)": 2,
  "Any": null
};

const ratingMap: Record<string, string | null> = {
  "G": "G", "PG": "PG", "PG-13": "PG-13", "NC-17": "NC-17", "R": "R", "Any": null
};

const yearMap: Record<string, number | null> = {
  "Any": null,
  ...Array.from({ length: 20 }, (_, i) => ({
    [(2006 + i).toString()]: 2006 + i
  })).reduce((acc, obj) => ({ ...acc, ...obj }), {})
};

const languageMap: Record<string, number | null> = {
  "English": 1, "Italian": 2, "Japanese": 3, "Mandarin": 4, "French": 5, "German": 6, "Any": null
};

const convertAnswersForAPI = (answers: string[]) => {
  return {
    categoryId: genreMap[answers[0]] || null,
    duration: durationMap[answers[1]] || null,
    rating: ratingMap[answers[2]] || null,
    releaseYear: yearMap[answers[3]] || null,
    languageId: languageMap[answers[4]] || null
  };
};

const getMovies = async (filters: any) => {
  const queryParams = new URLSearchParams(
    Object.fromEntries(
      Object.entries(filters)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => [key, String(value)])
    )
  );

  // ✅ Correct endpoint
  const apiUrl = `${API_URL}/films/filter?${queryParams.toString()}`;
  console.log("API URL:", apiUrl); // ✅ Log the corrected URL for debugging

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch movies");
    const movies = await response.json();
    console.log("Movies fetched:", movies); // ✅ Log fetched movies
    return movies;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};


const Questionnaire: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>(new Array(questions.length).fill(""));

  const handleAnswerChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const answer = event.target.value;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = (): void => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = (): void => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFormSubmit = async (): Promise<void> => {
    const filters = convertAnswersForAPI(answers);
    const movies = await getMovies(filters);

    if (movies.length > 0) {
      navigate("/movie-result", { state: { movies } });
    } else {
      alert("No movies found. Try adjusting your filters.");
    }
  };

  return (
    <div className="questionnaire">
      <h2>Movie Recommendation Questionnaire</h2>
      <div>
        <p>{questions[currentQuestionIndex].question}</p>
        <select value={answers[currentQuestionIndex]} onChange={handleAnswerChange}>
          <option value="">Select an option</option>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
          Next
        </button>
      </div>

      {currentQuestionIndex === questions.length - 1 && (
        <button onClick={handleFormSubmit}>Submit</button>
      )}
    </div>
  );
};

export default Questionnaire;




