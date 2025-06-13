'use client';

export default function QuestionNavigation({
  totalQuestions,
  currentQuestion,
  answers,
  onQuestionSelect,
  questionNavigationIndex,
}) {  
  const renderQuestionButtons = () => {
    const buttons = [];
    for (let i = 0; i < totalQuestions; i++) {
      // Changed navigation logic according to questionNavigationIndex
      const isAnswered = Object.prototype.hasOwnProperty.call(answers, questionNavigationIndex[i]);
      const isCurrent = i === currentQuestion;

      buttons.push(
        <button
          key={i}
          onClick={() => onQuestionSelect(i)}
          className={`
            w-8 h-8 rounded-full text-sm font-medium
            ${
              isCurrent
                ? 'bg-blue-600 text-white'
                : isAnswered
                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }
          `}
        >
          {i + 1}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Question Navigation</h3>
        <div className="text-sm text-gray-600">
          {Object.keys(answers).length} of {totalQuestions} answered
        </div>
      </div>
      <div className="grid grid-cols-10 gap-2">
        {renderQuestionButtons()}
      </div>
      <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-600 mr-1"></div>
          <span>Current</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-100 border-2 border-green-500 mr-1"></div>
          <span>Answered</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-gray-100 mr-1"></div>
          <span>Unanswered</span>
        </div>
      </div>
    </div>
  );
} 