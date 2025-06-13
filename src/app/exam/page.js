'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuestionDisplay from '@/components/QuestionDisplay';
import ExamTimer from '@/components/ExamTimer';
import QuestionNavigation from '@/components/QuestionNavigation';
import { questions, getRandomQuestions } from '@/data/questions';
import { saveExamState, loadExamState, clearExamState } from '@/lib/examUtils';

export default function ExamPage() {
  const router = useRouter();
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showConfirmExit, setShowConfirmExit] = useState(false);
  const [examStarted, setExamStarted] = useState(false);

  // Initialize exam
  useEffect(() => {
    const savedState = loadExamState();
    if (savedState) {
      setExamQuestions(savedState.questions);
      setCurrentQuestion(savedState.currentQuestion);
      setAnswers(savedState.answers);
      setExamStarted(true);
    } else {
      setExamQuestions(getRandomQuestions(180));
    }
  }, []);

  // Save exam state
  useEffect(() => {
    if (examStarted) {
      saveExamState({
        questions: examQuestions,
        currentQuestion,
        answers,
      });
    }
  }, [examStarted, currentQuestion, answers, examQuestions]);

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [examQuestions[currentQuestion].id]: answer
    }));
  };

  const handleTimeUp = () => {
    router.push('/results');
  };

  const handleExit = () => {
    setShowConfirmExit(true);
  };

  const confirmExit = () => {
    clearExamState();
    router.push('/');
  };

  const startExam = () => {
    setExamStarted(true);
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            PMP Practice Exam
          </h1>
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="font-semibold mb-2">Exam Instructions:</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Total Questions: 180</li>
                <li>Time Limit: 240 minutes</li>
                <li>You can navigate between questions</li>
                <li>Your progress will be saved automatically</li>
                <li>You can exit the exam at any time</li>
              </ul>
            </div>
            <button
              onClick={startExam}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Start Exam
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Timer */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">PMP Practice Exam</h1>
          <div className="flex items-center space-x-4">
            <ExamTimer
              initialTime={240 * 60}
              onTimeUp={handleTimeUp}
            />
            <button
              onClick={handleExit}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded"
            >
              Exit Exam
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <QuestionNavigation
              questionNavigationIndex={examQuestions.map(q => q.id)}
              totalQuestions={examQuestions.length}
              currentQuestion={currentQuestion}
              answers={answers}
              onQuestionSelect={setCurrentQuestion}
            />
          </div>

          {/* Question Display */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <QuestionDisplay
                question={examQuestions[currentQuestion]}
                onAnswer={handleAnswer}
                userAnswer={answers[currentQuestion]}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex justify-between items-center">
              <button
                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                disabled={currentQuestion === 0}
                className="px-6 py-2 bg-gray-100 rounded-lg disabled:opacity-50"
              >
                Previous
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentQuestion(prev => Math.min(examQuestions.length - 1, prev + 1))}
                  disabled={currentQuestion === examQuestions.length - 1}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
                >
                  Next
                </button>
                <button
                  onClick={() => router.push('/results')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Finish Exam
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Exit Confirmation Modal */}
      {showConfirmExit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Exit</h2>
            <p className="mb-6">
              Are you sure you want to exit the exam? Your progress will be lost.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmExit(false)}
                className="px-4 py-2 bg-gray-100 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmExit}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Exit Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}