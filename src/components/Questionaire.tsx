import React, { useState } from "react";

// Define the structure for the questions
const questions = [
  { id: 1, question: "What genre would you like to watch?", options: ["Action", "Animation", "Children", "Classics", "Comedy", "Documentary","Drama", "Foreign", "Horror", "Sci-Fi", "Sports", "Travel", "Any"] },
  { id: 2, question: "How much time do you have?", options: ["Not much (Under 1 hour)", "Decent amount (1-2 hours)", "I'm chilling (Over 2 hours)"] },
  { id: 3, question: "Do you have a preferred age rating?", options: ["G", "PG", "PG-13", "NC-17","R", "Any"] },
  { id: 4, question: "Desired time period?", options: ["2005-2010", "2011-2015", "2016-2020", "2021-2025", "Any"] },
  { id: 5, question: "What Language would you like to watch in?", options: ["English", "Italian", "Japanese", "Mandarin", "French", "German", "Any"] },
  { id: 6, question: "Any particular Actor/Actress you'd like to see?", options: ["G", "PG", "PG-13", "R", "Nope"] }
];

// Define prop type for Questionnaire component
interface QuestionnaireProps {
  onSubmit: () => void; // Expect onSubmit as a function
}

const Questionnaire: React.FC<QuestionnaireProps> = ({ onSubmit }) => {
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

  const progressPercentage: number = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleFormSubmit = (): void => {
    // Call onSubmit prop when the form is submitted
    onSubmit();
  };

  return (
    <div className="questionnaire">
      <h2>Movie Recommendation Questionnaire</h2>
      <div>
        <p>{questions[currentQuestionIndex].question}</p>
        <select
          value={answers[currentQuestionIndex]}
          onChange={handleAnswerChange}
        >
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

      <div className="progress-bar">
        <progress value={progressPercentage} max={100}></progress>
        <span>{Math.round(progressPercentage)}%</span>
      </div>

      {/* Submit button */}
      {currentQuestionIndex === questions.length - 1 && (
        <button onClick={handleFormSubmit}>Submit</button>
      )}
    </div>
  );
};

export default Questionnaire;


