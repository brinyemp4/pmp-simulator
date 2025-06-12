'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ResultsPage() {
  const router = useRouter();

  // Mock data - this would come from your actual exam state
  const results = {
    totalQuestions: 180,
    answeredQuestions: 175,
    correctAnswers: 142,
    timeSpent: '235:45', // Format: MM:SS
    performanceByDomain: [
      { name: 'People', score: 85, total: 100 },
      { name: 'Process', score: 78, total: 100 },
      { name: 'Business Environment', score: 82, total: 100 },
    ],
  };

  const calculatePercentage = (score, total) => {
    return ((score / total) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-center mb-8">
              Exam Results
            </h1>

            {/* Overall Score */}
            <div className="mb-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {calculatePercentage(results.correctAnswers, results.totalQuestions)}%
              </div>
              <p className="text-gray-600">
                {results.correctAnswers} correct out of {results.totalQuestions} questions
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {results.answeredQuestions}
                </div>
                <div className="text-gray-600">Questions Answered</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {results.timeSpent}
                </div>
                <div className="text-gray-600">Time Spent</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {results.totalQuestions - results.answeredQuestions}
                </div>
                <div className="text-gray-600">Questions Skipped</div>
              </div>
            </div>

            {/* Domain Performance */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Performance by Domain</h2>
              <div className="space-y-4">
                {results.performanceByDomain.map((domain) => (
                  <div key={domain.name}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{domain.name}</span>
                      <span className="text-gray-600">
                        {calculatePercentage(domain.score, domain.total)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${calculatePercentage(domain.score, domain.total)}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/exam"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-700 transition-colors"
              >
                Retake Exam
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg text-center hover:bg-gray-200 transition-colors"
              >
                Return Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 