'use client';

import { useState } from 'react';

export default function QuestionDisplay({ question, onAnswer, userAnswer }) {
  const [selectedAnswers, setSelectedAnswers] = useState(() => {
    // Initialize based on question type
    switch (question.type) {
      case 'multiple-response':
        return userAnswer || [];
      case 'matching':
        return userAnswer || [];
      default:
        return userAnswer || null;
    }
  });

  const handleAnswerChange = (answer) => {
    let newAnswer;
    
    switch (question.type) {
      case 'multiple-choice':
        newAnswer = answer;
        break;
      
      case 'multiple-response':
        newAnswer = Array.isArray(selectedAnswers) && selectedAnswers.includes(answer)
          ? selectedAnswers.filter(a => a !== answer)
          : [...(Array.isArray(selectedAnswers) ? selectedAnswers : []), answer];
        break;
      
      case 'matching':
        newAnswer = answer;
        break;
      
      default:
        newAnswer = answer;
    }
    
    setSelectedAnswers(newAnswer);
    onAnswer(newAnswer);
  };

  const isOptionSelected = (optionIndex) => {
    switch (question.type) {
      case 'multiple-response':
        return Array.isArray(selectedAnswers) && selectedAnswers.includes(optionIndex);
      case 'multiple-choice':
        return selectedAnswers === optionIndex;
      default:
        return false;
    }
  };

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'multiple-choice':
      case 'multiple-response':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <label
                key={index}
                className={`flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer ${
                  isOptionSelected(index) ? 'bg-blue-50 border-blue-200' : ''
                }`}
              >
                <input
                  type={question.type === 'multiple-response' ? 'checkbox' : 'radio'}
                  name="answer"
                  value={index}
                  checked={isOptionSelected(index)}
                  onChange={() => handleAnswerChange(index)}
                  className="h-4 w-4 text-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );

      case 'matching':
        return (
          <div className="space-y-4">
            {question.pairs.map((pair, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-1/2 p-2 bg-gray-50 rounded">
                  {pair.left}
                </div>
                <select
                  value={Array.isArray(selectedAnswers) && selectedAnswers[index]?.right || ''}
                  onChange={(e) => {
                    const newAnswers = [...(Array.isArray(selectedAnswers) ? selectedAnswers : [])];
                    newAnswers[index] = {
                      left: pair.left,
                      right: e.target.value
                    };
                    handleAnswerChange(newAnswers);
                  }}
                  className="w-1/2 p-2 border rounded"
                >
                  <option value="">Select matching item</option>
                  {question.pairs.map((p, i) => (
                    <option key={i} value={p.right}>
                      {p.right}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        );

      case 'scenario':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="whitespace-pre-line">{question.question}</p>
            </div>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer ${
                    selectedAnswers === index ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswers === index}
                    onChange={() => handleAnswerChange(index)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      case 'formula':
        return (
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="whitespace-pre-line">{question.question}</p>
            </div>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center space-x-3 p-3 border rounded hover:bg-gray-50 cursor-pointer ${
                    selectedAnswers === index ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="answer"
                    value={index}
                    checked={selectedAnswers === index}
                    onChange={() => handleAnswerChange(index)}
                    className="h-4 w-4 text-blue-600"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        );

      default:
        return <p>Unsupported question type</p>;
    }
  };

  return (
    <div className="prose max-w-none">
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
        </span>
        <span className="ml-2 inline-block bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
          {question.domain}
        </span>
      </div>
      <p className="text-lg font-medium mb-4">{question.question}</p>
      {renderQuestionContent()}
    </div>
  );
} 