export const questions = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Which of the following is NOT a process group in project management?',
    options: [
      'Initiating',
      'Planning',
      'Executing',
      'Controlling',
      'Closing'
    ],
    correctAnswer: 3, // Index of correct answer
    explanation: 'Controlling is not a process group. The five process groups are: Initiating, Planning, Executing, Monitoring and Controlling, and Closing.',
    domain: 'Process'
  },
  {
    id: 2,
    type: 'multiple-response',
    question: 'Which of the following are considered soft skills in project management? (Select all that apply)',
    options: [
      'Leadership',
      'Risk Management',
      'Communication',
      'Cost Estimation',
      'Team Building'
    ],
    correctAnswers: [0, 2, 4], // Indices of correct answers
    explanation: 'Soft skills include leadership, communication, and team building. Risk management and cost estimation are technical skills.',
    domain: 'People'
  },
  {
    id: 3,
    type: 'matching',
    question: 'Match the following project documents with their primary purpose:',
    pairs: [
      {
        left: 'Project Charter',
        right: 'Formally authorizes the project'
      },
      {
        left: 'Project Management Plan',
        right: 'Defines how the project will be executed'
      },
      {
        left: 'Work Breakdown Structure',
        right: 'Decomposes project deliverables'
      }
    ],
    explanation: 'These are key project documents that serve different purposes in project management.',
    domain: 'Process'
  },
  {
    id: 4,
    type: 'scenario',
    question: `You are managing a software development project. The client has requested a new feature that would require significant changes to the existing architecture. The development team estimates it would take 3 weeks to implement, but the client needs it in 2 weeks for a product launch.

What is the BEST approach to handle this situation?`,
    options: [
      'Accept the request and ask the team to work overtime',
      'Explain the technical constraints and propose alternative solutions',
      'Reject the request outright',
      'Implement the feature with reduced quality to meet the deadline'
    ],
    correctAnswer: 1,
    explanation: 'The best approach is to communicate the technical constraints and work with the client to find alternative solutions that meet their business needs while being feasible within the project constraints.',
    domain: 'Business Environment'
  },
  {
    id: 5,
    type: 'formula',
    question: 'Calculate the Earned Value (EV) for a project with the following details:\nBudget at Completion (BAC): $100,000\nPlanned Value (PV): $60,000\nActual Cost (AC): $55,000\nSchedule Performance Index (SPI): 1.1',
    options: [
      '$50,000',
      '$55,000',
      '$60,000',
      '$66,000'
    ],
    correctAnswer: 3,
    explanation: 'EV = PV × SPI\nEV = $60,000 × 1.1 = $66,000',
    domain: 'Process'
  }
];

export const getQuestionById = (id) => {
  return questions.find(q => q.id === id);
};

export const getQuestionsByDomain = (domain) => {
  return questions.filter(q => q.domain === domain);
};

export const getRandomQuestions = (count) => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 