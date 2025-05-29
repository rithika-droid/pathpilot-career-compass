
export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export const quizQuestionsByLevel: { [key: number]: QuizQuestion[] } = {
  1: [
    {
      question: "Which of the following best describes the use of Git in a development project?",
      options: [
        "Writing frontend UI",
        "Running JavaScript",
        "Version control and collaboration",
        "Connecting to databases"
      ],
      correct: 2,
      explanation: "Git is a version control system that helps developers track changes and collaborate on code."
    },
    {
      question: "You're building a portfolio. What's the best order of learning?",
      options: [
        "CSS → HTML → JavaScript",
        "HTML → CSS → JavaScript",
        "JavaScript → Git → HTML",
        "Git → HTML → SQL"
      ],
      correct: 1,
      explanation: "Start with HTML for structure, then CSS for styling, and finally JavaScript for interactivity."
    },
    {
      question: "If a website layout breaks when viewed on a phone, what concept are you likely missing?",
      options: [
        "Cloud computing",
        "Responsive design",
        "Recursion",
        "Back-end development"
      ],
      correct: 1,
      explanation: "Responsive design ensures websites work well across different screen sizes and devices."
    },
    {
      question: "You completed a course but forgot to save the certificate. What's the best next step?",
      options: [
        "Ignore it",
        "Ask the instructor to email",
        "Revisit course page and download",
        "Create a new account"
      ],
      correct: 2,
      explanation: "Most course platforms allow you to revisit and download certificates from your profile or course page."
    },
    {
      question: "Which path best suits someone who enjoys design, color, and user behavior?",
      options: [
        "Backend Developer",
        "Data Scientist",
        "UI/UX Designer",
        "System Administrator"
      ],
      correct: 2,
      explanation: "UI/UX Design focuses on visual design, user psychology, and creating intuitive user experiences."
    },
    {
      question: "When debugging a web application, what's the most effective first step?",
      options: [
        "Rewrite the entire code",
        "Check the browser console for errors",
        "Ask on social media",
        "Delete and reinstall the browser"
      ],
      correct: 1,
      explanation: "Browser console shows JavaScript errors, network issues, and other debugging information."
    },
    {
      question: "Which skill is most important for a beginner programmer to develop first?",
      options: [
        "Advanced algorithms",
        "Problem-solving and logical thinking",
        "Learning multiple programming languages",
        "Memorizing syntax"
      ],
      correct: 1,
      explanation: "Problem-solving skills are fundamental and apply to any programming language or technology."
    }
  ],
  2: [
    {
      question: "In software development, what does 'DRY' principle stand for?",
      options: [
        "Do Repeat Yourself",
        "Don't Repeat Yourself",
        "Develop Rapid Yields",
        "Debug Runtime Yearly"
      ],
      correct: 1,
      explanation: "DRY principle encourages writing reusable code to avoid duplication and reduce maintenance."
    },
    {
      question: "Which database type is best for storing user profiles with varying attributes?",
      options: [
        "Relational (SQL)",
        "NoSQL (Document-based)",
        "Graph database",
        "Time-series database"
      ],
      correct: 1,
      explanation: "NoSQL document databases like MongoDB are flexible for storing varying user profile structures."
    },
    {
      question: "What's the main advantage of using a framework like React over vanilla JavaScript?",
      options: [
        "It's faster to execute",
        "Component reusability and state management",
        "It requires less code",
        "It works without internet"
      ],
      correct: 1,
      explanation: "Frameworks provide structure, reusable components, and better state management for complex applications."
    }
  ],
  3: [
    {
      question: "In a microservices architecture, how should services communicate?",
      options: [
        "Direct database access",
        "Shared memory",
        "API calls (REST/GraphQL)",
        "File sharing"
      ],
      correct: 2,
      explanation: "Services should communicate through well-defined APIs to maintain independence and scalability."
    },
    {
      question: "What's the primary purpose of Docker in development?",
      options: [
        "Code version control",
        "Application containerization",
        "Database management",
        "UI design"
      ],
      correct: 1,
      explanation: "Docker containers ensure applications run consistently across different environments."
    }
  ]
};
