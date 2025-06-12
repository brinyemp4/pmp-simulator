import { Inter } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'PMP Simulator - Practice for PMP Certification',
  description: 'A comprehensive PMP certification exam simulator with 180 questions and a 240-minute timer.',
};

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {/* Navigation Header */}
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <Link 
                    href="/"
                    className="flex items-center px-2 py-2 text-gray-900 hover:text-blue-600 transition-colors"
                  >
                    <span className="text-xl font-bold">PMP Simulator</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  <Link
                    href="/exam"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Practice Exam
                  </Link>
                  <Link
                    href="/results"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Results
                  </Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-white border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <p className="text-center text-gray-500 text-sm">
                © {new Date().getFullYear()} PMP Simulator. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 