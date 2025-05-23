
import { careerPaths } from '../data/careerPaths';

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

  // Get available careers from our careerPaths data
  const availableCareers = Object.keys(careerPaths);

  // Branch-based filtering
  let careerPool: string[] = [];
  
  switch (branch) {
    case 'CSE':
      careerPool = availableCareers.filter(c => ['Machine Learning Engineer', 'AI Research Scientist'].includes(c));
      break;
    case 'CS':
      careerPool = availableCareers.filter(c => ['UI/UX Designer', 'Machine Learning Engineer'].includes(c));
      break;
    case 'DS':
      careerPool = availableCareers.filter(c => ['Data Scientist', 'Machine Learning Engineer'].includes(c));
      break;
    case 'AI/ML':
      careerPool = availableCareers.filter(c => ['Machine Learning Engineer', 'AI Research Scientist'].includes(c));
      break;
    case 'Cybersecurity':
      return 'Cybersecurity Specialist';
    default:
      careerPool = availableCareers;
  }

  // Apply decision logic based on purpose
  if (purpose === 'Research' || abroadPlans === 'Yes') {
    const researchCareers = careerPool.filter(career => 
      career.includes('Research') || career.includes('Scientist')
    );
    if (researchCareers.length > 0) {
      return researchCareers[0];
    }
  }

  if (purpose === 'Entrepreneurship') {
    const entrepreneurialCareers = careerPool.filter(career =>
      career.includes('Engineer') || career === 'UI/UX Designer'
    );
    if (entrepreneurialCareers.length > 0) {
      return entrepreneurialCareers[0];
    }
  }

  if (financialStatus === '0-3' || financialStatus === '3-6') {
    const accessibleCareers = careerPool.filter(career =>
      career.includes('Engineer') || career === 'Data Scientist'
    );
    if (accessibleCareers.length > 0) {
      return accessibleCareers[0];
    }
  }

  // Default: return first career from the pool
  return careerPool[0] || 'Data Scientist';
};

export const getCareerRoadmap = (careerPath: string) => {
  // Now we get data from our careerPaths
  const career = careerPaths[careerPath];
  
  if (!career) {
    // Provide a default roadmap if career not found
    return {
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
  }
  
  // Return the career's levels data in a format compatible with existing code
  const roadmap: any = {};
  
  career.levels.forEach((level, index) => {
    roadmap[`level${index + 1}`] = {
      title: level.title,
      courses: level.courses.map(course => course.name),
      projects: level.projects || [],
      duration: level.duration || '3-4 months'
    };
  });
  
  return roadmap;
};
