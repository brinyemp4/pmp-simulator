'use client';

import { useState, useEffect } from 'react';

export default function ExamTimer({ initialTime, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isWarning, setIsWarning] = useState(false);
  const [isCritical, setIsCritical] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  useEffect(() => {
    // Show warning when 30 minutes remaining
    if (timeLeft <= 1800 && !isWarning) {
      setIsWarning(true);
    }
    // Show critical warning when 5 minutes remaining
    if (timeLeft <= 300 && !isCritical) {
      setIsCritical(true);
    }
  }, [timeLeft, isWarning, isCritical]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      className={`font-mono text-lg font-semibold ${
        isCritical
          ? 'text-red-600 animate-pulse'
          : isWarning
          ? 'text-yellow-600'
          : 'text-gray-900'
      }`}
    >
      {formatTime(timeLeft)}
    </div>
  );
} 