
export interface ChatbotResponse {
  intent: string;
  patterns: string[];
  responses: string[];
}

export const chatbotResponses: ChatbotResponse[] = [
  {
    intent: "career_recommendation",
    patterns: [
      "what should I do after",
      "suggest a career path",
      "good career path",
      "career options",
      "what career suits me",
      "don't want to code",
      "which field should",
      "best career after",
      "career suggestion"
    ],
    responses: [
      "Based on your interests, you might consider exploring UI/UX design, data science, or cybersecurity. Each offers different career prospects and skill requirements. Would you like me to explain any of these in detail?",
      "For someone at your level, I'd recommend exploring UI/UX design if you're creative, data science if you enjoy statistics, or cloud engineering if you like infrastructure. Which sounds most interesting to you?",
      "If you prefer less coding, consider careers like UI/UX design, product management, or technical writing. These roles use technical knowledge but require less day-to-day programming.",
      "Since you're in CSE, you could explore specialized fields like AI/ML, cybersecurity, or cloud computing. Each has strong job prospects, though AI/ML requires strong math skills.",
      "For creative minds interested in technology, consider UI/UX design, digital product design, or frontend development. These combine creativity with technical skills.",
      "Based on your roadmap progress, I'd recommend focusing on mastering frontend basics before specializing. HTML, CSS, JavaScript, and Git will give you a solid foundation."
    ]
  },
  {
    intent: "course_suggestion",
    patterns: [
      "beginner course",
      "learn python",
      "start with data science",
      "how to learn",
      "recommend course",
      "best course for",
      "free course",
      "course recommendation",
      "how to start"
    ],
    responses: [
      "For Python beginners, I recommend the free 'Python for Everybody' course by Dr. Chuck on Coursera, or freeCodeCamp's Python course on YouTube. Both are excellent for newcomers.",
      "To start with data science, first learn Python basics, then try 'Introduction to Data Science in Python' on Coursera. For a free alternative, check out Keith Galli's YouTube series.",
      "For web development beginners, start with freeCodeCamp's 'Responsive Web Design' certification. It covers HTML, CSS, and responsive design principles with hands-on projects.",
      "Level 1 of your roadmap focuses on fundamentals: HTML, CSS, JavaScript, Git, and computer science basics. Would you like me to show you the full course list?",
      "Based on your interests in UI/UX, I'd recommend the 'Google UX Design Professional Certificate' on Coursera, or free resources like the Refactoring UI YouTube channel.",
      "If you're interested in JavaScript, check out 'The Modern JavaScript Tutorial' (javascript.info) for beginners, or 'JavaScript30' by Wes Bos for practical projects."
    ]
  },
  {
    intent: "certificate_help",
    patterns: [
      "where are my certificates",
      "can't find certificate",
      "certificate not showing",
      "missed certificate",
      "download certificate",
      "certificate problem",
      "get my certificate"
    ],
    responses: [
      "Your completed certificates will appear in the 'My Certificates' section. If you've completed a course but don't see the certificate, make sure you've clicked 'Mark as Complete' on the course page.",
      "Certificates are awarded automatically when you mark courses as complete. They're saved to your profile and can be accessed from the Certificates page in the dashboard.",
      "If your certificate isn't showing up, try refreshing the page or logging out and back in. If the problem persists, ensure you've fully completed all course requirements.",
      "When you complete a course, click the 'Mark as Completed' button to receive your certificate. All certificates are stored in your profile under 'My Certificates'.",
      "To ensure your certificate is saved, check that you've marked the course as complete and that your progress was properly saved. Certificates are stored locally and will persist between sessions."
    ]
  },
  {
    intent: "roadmap_guidance",
    patterns: [
      "what's next on roadmap",
      "how to progress",
      "next step",
      "advance to next level",
      "my learning path",
      "complete the roadmap",
      "roadmap progress"
    ],
    responses: [
      "Based on your current level, your next step is to complete the courses in Level 1: HTML/CSS fundamentals, JavaScript basics, Git, and computer science intro. Have you started any of these yet?",
      "To advance to the next roadmap level, complete all courses in your current level and pass the level assessment quiz with at least 70%. This ensures you have the foundation before moving forward.",
      "I see you're on Level 1. Focus on completing the foundation courses first: HTML, CSS, JavaScript, and Git. These are essential building blocks for any programming career.",
      "Looking at your progress, you've completed several courses already! To move forward, finish the remaining courses in your level and then take the assessment quiz.",
      "The roadmap is designed to build your skills progressively. After you finish Level 1 basics, Level 2 focuses on intermediate concepts like frameworks and databases."
    ]
  },
  {
    intent: "technical_question",
    patterns: [
      "what is html",
      "how does javascript",
      "explain css",
      "difference between",
      "what does git do",
      "how to use api",
      "what is a framework"
    ],
    responses: [
      "HTML (HyperText Markup Language) is the standard language for creating web pages. It uses tags to structure content like headings, paragraphs, and images. CSS is then used to style this structure.",
      "JavaScript is a programming language that adds interactivity to websites. Unlike HTML (structure) and CSS (style), JS handles functionality like form validation, animations, and dynamic content updates.",
      "Git is a version control system that tracks changes in your code. It helps you collaborate with others, maintain a history of your work, and roll back to previous versions if needed.",
      "The difference between frontend and backend development is that frontend handles what users see and interact with (using HTML, CSS, JavaScript), while backend manages server logic, databases, and APIs (using languages like Python, Node.js, etc.).",
      "A framework provides pre-written code and structure for building applications. It's like using a blueprint instead of building from scratch. Popular examples include React for frontend and Django for backend.",
      "An API (Application Programming Interface) lets different software systems communicate. Think of it as a waiter in a restaurant - it takes your request, gets what you need from the kitchen (server), and brings back a response."
    ]
  },
  {
    intent: "job_preparation",
    patterns: [
      "prepare for interview",
      "get internship",
      "resume tips",
      "job application",
      "portfolio advice",
      "career advice",
      "LinkedIn profile"
    ],
    responses: [
      "For tech interviews, build a strong portfolio showing your projects, practice coding challenges on platforms like LeetCode, and research companies before interviews. Your GitHub profile is as important as your resume.",
      "To create an effective portfolio, include 3-5 quality projects that demonstrate different skills. Each should have a clear problem statement, your solution, technologies used, and a link to view it live.",
      "When applying for internships, tailor your resume for each position, highlight relevant projects/coursework, include your GitHub profile, and write personalized cover letters mentioning why you're interested in that specific company.",
      "For a standout LinkedIn profile, add a professional photo, write a compelling summary highlighting your tech interests, showcase projects with links, and engage with industry content to build your network.",
      "Resume tips for tech: keep it to one page, highlight relevant projects and skills, quantify achievements when possible, list technologies you're familiar with, and tailor it for each application."
    ]
  },
  {
    intent: "greeting",
    patterns: [
      "hello",
      "hi",
      "hey",
      "good morning",
      "good afternoon",
      "good evening",
      "what's up"
    ],
    responses: [
      "Hi there! I'm your PathPilot Assistant. How can I help with your career path today?",
      "Hello! I'm here to guide you on your tech journey. What would you like to know about courses or career paths?",
      "Hey! I'm your learning assistant. Need help with course recommendations, career advice, or roadmap guidance?",
      "Welcome to PathPilot! I can help you navigate your learning journey. What questions do you have today?"
    ]
  },
  {
    intent: "thank_you",
    patterns: [
      "thank you",
      "thanks",
      "appreciate it",
      "that was helpful",
      "great help"
    ],
    responses: [
      "You're welcome! Feel free to ask if you need more guidance on your learning journey.",
      "Happy to help! Don't hesitate to reach out with more questions as you progress.",
      "Glad I could assist! Keep up the great work on your learning path.",
      "Anytime! Remember, consistent practice is key to mastering tech skills."
    ]
  }
];

export function findBestResponse(message: string): string {
  message = message.toLowerCase();
  
  let bestMatch = {
    intent: '',
    score: 0
  };
  
  // Check each intent for matching patterns
  chatbotResponses.forEach(responseGroup => {
    let score = 0;
    
    responseGroup.patterns.forEach(pattern => {
      if (message.includes(pattern.toLowerCase())) {
        score += 1;
      }
    });
    
    if (score > bestMatch.score) {
      bestMatch = {
        intent: responseGroup.intent,
        score: score
      };
    }
  });
  
  // If no good match found, return a fallback response
  if (bestMatch.score === 0) {
    return "I'm not quite sure how to help with that. Could you try rephrasing your question? I can assist with career advice, course recommendations, or roadmap guidance.";
  }
  
  // Find the matching response group
  const matchedGroup = chatbotResponses.find(group => group.intent === bestMatch.intent);
  
  if (!matchedGroup) {
    return "I'm sorry, I don't have information on that topic yet. Please try asking about course recommendations, career paths, or certificate help.";
  }
  
  // Return a random response from the matched group
  return matchedGroup.responses[Math.floor(Math.random() * matchedGroup.responses.length)];
}
