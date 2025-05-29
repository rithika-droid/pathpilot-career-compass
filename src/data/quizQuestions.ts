
export interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
}

export const quizQuestionsByLevel: Record<number, QuizQuestion[]> = {
  1: [
    {
      question: "What is the output of: console.log(typeof null)?",
      options: ["object", "null", "undefined", "number"],
      correct: 0,
      explanation: "In JavaScript, typeof null returns 'object' due to a historical bug that has been kept for compatibility reasons."
    },
    {
      question: "Which HTML tag is used for semantic navigation?",
      options: ["<div>", "<nav>", "<span>", "<section>"],
      correct: 1,
      explanation: "The <nav> tag is specifically designed for navigation links and provides semantic meaning to screen readers and search engines."
    },
    {
      question: "What does 'git stash' do?",
      options: ["Deletes untracked files", "Saves local changes temporarily", "Commits changes", "Pulls new changes"],
      correct: 1,
      explanation: "Git stash temporarily saves your uncommitted changes so you can work on something else, then come back and restore them later."
    },
    {
      question: "Which CSS property is used to make a website responsive?",
      options: ["position", "display", "media queries", "float"],
      correct: 2,
      explanation: "Media queries allow you to apply different CSS styles based on device characteristics like screen width, making websites responsive."
    },
    {
      question: "What is the purpose of semantic HTML?",
      options: ["Make pages load faster", "Provide meaning to content structure", "Add styling to elements", "Enable JavaScript functionality"],
      correct: 1,
      explanation: "Semantic HTML uses elements that clearly describe their meaning in a human and machine-readable way, improving accessibility and SEO."
    },
    {
      question: "In JavaScript, what is the difference between 'let' and 'var'?",
      options: ["No difference", "let has block scope, var has function scope", "var is newer than let", "let is faster than var"],
      correct: 1,
      explanation: "'let' has block scope and cannot be redeclared, while 'var' has function scope and can be redeclared, making 'let' safer to use."
    },
    {
      question: "What is the main advantage of using version control like Git?",
      options: ["Faster code execution", "Track changes and collaborate", "Automatic bug fixing", "Better UI design"],
      correct: 1,
      explanation: "Version control systems like Git allow you to track changes over time, collaborate with others, and revert to previous versions when needed."
    },
    {
      question: "Which principle is most important in UI/UX design?",
      options: ["Use many colors", "User-centered design", "Complex animations", "Latest trends"],
      correct: 1,
      explanation: "User-centered design focuses on creating interfaces that meet user needs and provide good user experience, which is the core principle of UI/UX design."
    },
    {
      question: "What should be your first step when building a portfolio website?",
      options: ["Choose the latest framework", "Plan content and structure", "Add animations", "Pick a color scheme"],
      correct: 1,
      explanation: "Planning your content and structure first ensures your portfolio effectively showcases your skills and achievements before focusing on visual design."
    },
    {
      question: "For a beginner, which is the best order to learn web development?",
      options: ["JavaScript → HTML → CSS", "HTML → CSS → JavaScript", "CSS → JavaScript → HTML", "All at the same time"],
      correct: 1,
      explanation: "HTML provides structure, CSS adds styling, and JavaScript adds functionality. Learning in this order builds a solid foundation progressively."
    }
  ],
  2: [
    {
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 1,
      explanation: "Binary search has O(log n) time complexity because it eliminates half of the search space in each iteration."
    },
    {
      question: "Which data structure uses LIFO (Last In, First Out) principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      correct: 1,
      explanation: "A stack follows the LIFO principle where the last element added is the first one to be removed."
    },
    {
      question: "In object-oriented programming, what is inheritance?",
      options: ["Creating multiple objects", "A class acquiring properties from another class", "Deleting unused code", "Optimizing performance"],
      correct: 1,
      explanation: "Inheritance allows a class to inherit properties and methods from another class, promoting code reusability."
    }
  ],
  3: [
    {
      question: "What is the main purpose of design patterns in software development?",
      options: ["Make code run faster", "Provide reusable solutions to common problems", "Reduce file size", "Add more features"],
      correct: 1,
      explanation: "Design patterns provide tested, proven development paradigms that solve recurring design problems in software development."
    },
    {
      question: "In a microservices architecture, what is the main advantage?",
      options: ["Easier to debug", "Independent scaling and deployment", "Faster development", "Less code to write"],
      correct: 1,
      explanation: "Microservices allow each service to be developed, deployed, and scaled independently, improving flexibility and maintainability."
    }
  ]
};

// Helper function to get questions for a specific level
export const getQuizQuestions = (level: number): QuizQuestion[] => {
  return quizQuestionsByLevel[level] || quizQuestionsByLevel[1];
};
