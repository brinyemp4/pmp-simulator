// Time management
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Answer validation
export const validateAnswer = (question, userAnswer) => {
  switch (question.type) {
    case 'multiple-choice':
      return userAnswer === question.correctAnswer;
    
    case 'multiple-response':
      if (!Array.isArray(userAnswer)) return false;
      return (
        userAnswer.length === question.correctAnswers.length &&
        userAnswer.every(answer => question.correctAnswers.includes(answer))
      );
    
    case 'matching':
      if (!Array.isArray(userAnswer)) return false;
      return userAnswer.every((pair, index) => {
        const correctPair = question.pairs[index];
        return pair.left === correctPair.left && pair.right === correctPair.right;
      });
    
    default:
      return false;
  }
};

// Progress calculation
export const calculateProgress = (answers, totalQuestions) => {
  const answeredCount = Object.keys(answers).length;
  return {
    answered: answeredCount,
    remaining: totalQuestions - answeredCount,
    percentage: (answeredCount / totalQuestions) * 100
  };
};

// Performance calculation
export const calculatePerformance = (answers, questions) => {
  let correct = 0;
  let total = 0;
  const domainScores = {};

  Object.entries(answers).forEach(([questionId, answer]) => {
    const question = questions.find(q => q.id === parseInt(questionId));
    if (question) {
      total++;
      if (validateAnswer(question, answer)) {
        correct++;
        // Track domain scores
        if (!domainScores[question.domain]) {
          domainScores[question.domain] = { correct: 0, total: 0 };
        }
        domainScores[question.domain].correct++;
      }
      if (!domainScores[question.domain]) {
        domainScores[question.domain] = { correct: 0, total: 0 };
      }
      domainScores[question.domain].total++;
    }
  });

  return {
    overall: {
      correct,
      total,
      percentage: (correct / total) * 100
    },
    byDomain: Object.entries(domainScores).map(([domain, scores]) => ({
      domain,
      correct: scores.correct,
      total: scores.total,
      percentage: (scores.correct / scores.total) * 100
    }))
  };
};

// Local storage management
export const saveExamState = (state) => {
  try {
    localStorage.setItem('pmpExamState', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving exam state:', error);
  }
};

export const loadExamState = () => {
  try {
    const state = localStorage.getItem('pmpExamState');
    return state ? JSON.parse(state) : null;
  } catch (error) {
    console.error('Error loading exam state:', error);
    return null;
  }
};

export const clearExamState = () => {
  try {
    localStorage.removeItem('pmpExamState');
  } catch (error) {
    console.error('Error clearing exam state:', error);
  }
}; 