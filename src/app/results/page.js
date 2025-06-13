'use client';

import Link from 'next/link';
import { loadExamState, calculatePerformance, formatTime } from '@/lib/examUtils';
import { questions } from '@/data/questions';

export default function ResultsPage() {

  // Load answers and time from localStorage (exam state)
  const examState = typeof window !== 'undefined' ? loadExamState() : null;
  const answers = examState?.answers || {};
  const timeSpentSeconds = examState?.timeSpent || 0;
  const totalQuestions = examState?.questions?.length || questions.length;

  // Calculate performance
  const performance = calculatePerformance(answers, examState?.questions || questions);
  
  // Progress
  const answeredQuestions = Object.keys(answers).length;
  const skippedQuestions = totalQuestions - answeredQuestions;

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
                {typeof performance.overall.percentage === 'number' && !isNaN(performance.overall.percentage)
                  ? performance.overall.percentage.toFixed(1)
                  : '0.0'
                }%
              </div>
              <p className="text-gray-600">
                {performance.overall.correct} correct out of {performance.overall.total} questions
              </p>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {answeredQuestions}
                </div>
                <div className="text-gray-600">Questions Answered</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {formatTime(timeSpentSeconds)}
                </div>
                <div className="text-gray-600">Time Spent</div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-semibold text-gray-900">
                  {skippedQuestions}
                </div>
                <div className="text-gray-600">Questions Skipped</div>
              </div>
            </div>

            {/* Domain Performance */}
            {performance.byDomain && performance.byDomain.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Performance by Domain</h2>
                <div className="space-y-4">
                  {performance.byDomain.map((domain) => (
                    <div key={domain.domain}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{domain.domain}</span>
                        <span className="text-gray-600">
                          {domain.percentage.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${domain.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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