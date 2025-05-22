
interface ProfileData {
  subject: string;
  year: string;
  branch: string;
  financialStatus: string;
  abroadPlans: string;
  purpose: string;
}

export const careerDecisionAlgorithm = (profile: ProfileData): string => {
  const { branch, purpose, abroadPlans, financialStatus } = profile;

  // CSE Career Paths
  const cseCareerPaths = [
    'Full Stack Developer',
    'Software Engineer',
    'DevOps Engineer',
    'Cloud Architect',
    'Cybersecurity Specialist',
    'Blockchain Developer',
    'Game Developer',
    'Mobile App Developer',
    'System Administrator',
    'Software Architect'
  ];

  // CS Career Paths
  const csCareerPaths = [
    'Frontend Developer',
    'Backend Developer',
    'Embedded Systems Engineer',
    'Network Engineer',
    'Database Administrator',
    'UI/UX Designer',
    'Quality Assurance Engineer',
    'Technical Writer',
    'IT Consultant',
    'Quantum Computing Researcher'
  ];

  // Data Science Career Paths
  const dsCareerPaths = [
    'Data Scientist',
    'Data Analyst',
    'Data Engineer',
    'Business Intelligence Analyst',
    'Statistical Analyst',
    'Data Architect',
    'Machine Learning Engineer',
    'Research Scientist',
    'Product Analyst',
    'Quantitative Analyst'
  ];

  // AI/ML Career Paths
  const aimlCareerPaths = [
    'Machine Learning Engineer',
    'AI Research Scientist',
    'Computer Vision Engineer',
    'Natural Language Processing Engineer',
    'AI Product Manager',
    'Robotics Engineer',
    'Deep Learning Engineer',
    'AI Ethics Specialist',
    'Autonomous Systems Engineer',
    'AI Consultant'
  ];

  let careerPool: string[] = [];

  // Select career pool based on branch
  switch (branch) {
    case 'CSE':
      careerPool = cseCareerPaths;
      break;
    case 'CS':
      careerPool = csCareerPaths;
      break;
    case 'DS':
      careerPool = dsCareerPaths;
      break;
    case 'AI/ML':
      careerPool = aimlCareerPaths;
      break;
    default:
      careerPool = [...cseCareerPaths, ...csCareerPaths];
  }

  // Apply decision logic based on other factors
  if (purpose === 'Research' || abroadPlans === 'Yes') {
    const researchCareers = careerPool.filter(career => 
      career.includes('Research') || career.includes('Scientist') || career.includes('Engineer')
    );
    if (researchCareers.length > 0) {
      return researchCareers[0];
    }
  }

  if (purpose === 'Entrepreneurship') {
    const entrepreneurialCareers = careerPool.filter(career =>
      career.includes('Product') || career.includes('Full Stack') || career.includes('Architect')
    );
    if (entrepreneurialCareers.length > 0) {
      return entrepreneurialCareers[0];
    }
  }

  if (financialStatus === '0-3' || financialStatus === '3-6') {
    const accessibleCareers = careerPool.filter(career =>
      career.includes('Developer') || career.includes('Analyst') || career.includes('Engineer')
    );
    if (accessibleCareers.length > 0) {
      return accessibleCareers[0];
    }
  }

  // Default: return first career from the pool
  return careerPool[0] || 'Software Developer';
};

export const getCareerRoadmap = (careerPath: string) => {
  const defaultRoadmap = {
    level1: {
      title: 'Foundation',
      courses: ['Programming Basics', 'Computer Science Fundamentals'],
      projects: ['Hello World App', 'Basic Calculator'],
      duration: '2-3 months'
    },
    level2: {
      title: 'Intermediate',
      courses: ['Data Structures', 'Algorithms', 'Database Basics'],
      projects: ['Personal Portfolio', 'CRUD Application'],
      duration: '3-4 months'
    },
    level3: {
      title: 'Advanced',
      courses: ['System Design', 'Advanced Frameworks', 'Testing'],
      projects: ['Full Stack Project', 'API Development'],
      duration: '4-5 months'
    },
    level4: {
      title: 'Specialization',
      courses: ['Domain Specific Skills', 'Industry Tools', 'Best Practices'],
      projects: ['Industry-level Project', 'Open Source Contribution'],
      duration: '5-6 months'
    },
    level5: {
      title: 'Expert',
      courses: ['Leadership', 'Architecture', 'Advanced Topics'],
      projects: ['Capstone Project', 'Team Leadership'],
      duration: '6+ months'
    }
  };

  return defaultRoadmap;
};
