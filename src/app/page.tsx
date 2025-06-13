'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-blue-700 mb-6 drop-shadow-lg animate-pulse">
            PMP Certification Simulator
          </h1>
          <p className="text-2xl text-gray-700 mb-10 font-light">
            Practice for your PMP certification exam with our comprehensive simulator.<br />
            <span className="text-blue-600 font-medium">Experience the real exam environment with 180 questions and a 240-minute timer.</span>
          </p>
          <Link 
            href="/exam"            
          >
            <button className="text-lg px-10 py-4 mb-8 shadow-lg hover:scale-105 focus-visible:ring-4 focus-visible:ring-blue-300">
            Start Practice Exam
            </button>
          </Link>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card border-t-4 border-blue-500">
              <h2 className="text-2xl font-semibold mb-4 text-blue-700">Exam Features</h2>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• 180 questions</li>
                <li>• 240-minute timer</li>
                <li>• Multiple question types</li>
                <li>• Detailed explanations</li>
              </ul>
            </div>
            <div className="card border-t-4 border-blue-400">
              <h2 className="text-2xl font-semibold mb-4 text-blue-600">Question Types</h2>
              <ul className="text-left space-y-2 text-gray-700">
                <li>• Multiple Choice</li>
                <li>• Multiple Response</li>
                <li>• Matching</li>
                <li>• Scenario Based</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}