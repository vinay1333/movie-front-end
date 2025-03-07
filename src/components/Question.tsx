import React from "react";

// Defining the types for the props expected by the QuestionComponent
interface QuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  answer: string;
  onAnswerChange: (answer: string) => void; // Function to handle answer change
}

const Question: React.FC<QuestionProps> = (props) => {
  return (
    <div className="question">
      <h3>{props.question.question}</h3>

      {/* Render the options as radio buttons */}
      <div className="options">
        {props.question.options.map((option, index) => (
          <label key={index} className="option">
            <input
              type="radio"
              name={`question-${props.question.id}`}
              value={option}
              checked={props.answer === option}
              onChange={() => props.onAnswerChange(option)} // Update the answer on selection
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Question;

