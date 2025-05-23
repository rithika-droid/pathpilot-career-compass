
export interface Course {
  name: string;
  link: string;
}

export interface CareerLevel {
  title: string;
  courses: Course[];
  projects?: string[];
  internships: string[];
  jobs: string[];
  masters: string;
  duration?: string;
}

export interface Career {
  title: string;
  description: string;
  salaryRange: string;
  levels: CareerLevel[];
  skills: string[];
}

export const careerPaths: Record<string, Career> = {
  "Data Scientist": {
    title: "Data Scientist",
    description: "Extract insights from complex data using statistical analysis and machine learning techniques.",
    salaryRange: "₹6L - ₹25L per annum",
    skills: ["Python", "Statistics", "Machine Learning", "SQL", "Data Visualization"],
    levels: [
      {
        title: "Level 1 – Fundamentals",
        courses: [
          {
            name: "Python for Data Science – IBM",
            link: "https://www.coursera.org/learn/python-for-applied-data-science-ai"
          },
          {
            name: "Mathematics for ML – Imperial College",
            link: "https://www.coursera.org/specializations/mathematics-machine-learning"
          }
        ],
        projects: ["Exploratory Data Analysis Project", "Statistical Analysis Report"],
        internships: [
          "https://internship.aicte-india.org/",
          "https://www.kaggle.com/"
        ],
        jobs: [
          "https://www.linkedin.com/jobs/",
          "https://www.turing.com/"
        ],
        masters: "Apply to MS in Data Science at TU Munich, University of Helsinki, or IISc Bangalore.",
        duration: "2-3 months"
      },
      {
        title: "Level 2 – Machine Learning & EDA",
        courses: [
          {
            name: "Machine Learning by Andrew Ng",
            link: "https://www.coursera.org/learn/machine-learning"
          },
          {
            name: "Khan Academy – Statistics & Probability",
            link: "https://www.khanacademy.org/math/statistics-probability"
          }
        ],
        projects: ["Regression Analysis Project", "Classification Model Implementation"],
        internships: [
          "https://research.google/careers/ai-residency/",
          "https://www.internshala.com/internships/machine-learning-internship"
        ],
        jobs: [
          "https://www.indeed.com/q-Data-Scientist-jobs.html",
          "https://angel.co/jobs"
        ],
        masters: "Check DAAD-funded programs and apply to ETH Zurich or NUS.",
        duration: "3-4 months"
      },
      {
        title: "Level 3 – Deep Learning & Projects",
        courses: [
          {
            name: "Deep Learning Specialization – Coursera",
            link: "https://www.coursera.org/specializations/deep-learning"
          },
          {
            name: "CS50 AI – Harvard",
            link: "https://cs50.harvard.edu/ai/2020/"
          }
        ],
        projects: ["Neural Network Implementation", "Computer Vision Project"],
        internships: [
          "https://careers.google.com/jobs/results/",
          "https://ai.facebook.com/careers/"
        ],
        jobs: [
          "https://remoteok.com/remote-data+science-jobs",
          "https://www.naukri.com/data-scientist-jobs"
        ],
        masters: "Apply to Stanford, Carnegie Mellon, or Cambridge for AI/Data Science MS.",
        duration: "4-5 months"
      },
      {
        title: "Level 4 – Advanced Topics",
        courses: [
          {
            name: "Natural Language Processing Specialization",
            link: "https://www.coursera.org/specializations/natural-language-processing"
          },
          {
            name: "Advanced Data Science with IBM",
            link: "https://www.coursera.org/specializations/advanced-data-science-ibm"
          }
        ],
        projects: ["NLP Project", "Big Data Analysis"],
        internships: [
          "https://research.microsoft.com/en-us/jobs/fulltime/",
          "https://careers.ibm.com/job-search/"
        ],
        jobs: [
          "https://www.glassdoor.co.in/Job/data-scientist-jobs-SRCH_KO0,14.htm",
          "https://www.toptal.com/"
        ],
        masters: "Apply for research assistantships at top universities to support your studies.",
        duration: "5-6 months"
      },
      {
        title: "Level 5 – Specialization & Industry",
        courses: [
          {
            name: "Advanced Machine Learning Specialization",
            link: "https://www.coursera.org/specializations/aml"
          },
          {
            name: "TensorFlow: Advanced Techniques",
            link: "https://www.coursera.org/specializations/tensorflow-advanced-techniques"
          }
        ],
        projects: ["End-to-End ML Pipeline", "Industry Research Project"],
        internships: [
          "https://research.netflix.com/",
          "https://www.apple.com/careers/us/students.html"
        ],
        jobs: [
          "https://www.amazon.jobs/en/job_categories/data-science",
          "https://careers.google.com/jobs/results/"
        ],
        masters: "Consider PhD programs after industry experience if research interests you.",
        duration: "6+ months"
      }
    ]
  },
  "Machine Learning Engineer": {
    title: "Machine Learning Engineer",
    description: "Build and deploy machine learning models into production environments.",
    salaryRange: "₹7L - ₹30L per annum",
    skills: ["Python", "TensorFlow/PyTorch", "MLOps", "Software Engineering", "Cloud Services"],
    levels: [
      {
        title: "Level 1 – ML Foundations",
        courses: [
          {
            name: "Google AI Crash Course",
            link: "https://developers.google.com/machine-learning/crash-course"
          },
          {
            name: "Fast.ai Practical Deep Learning",
            link: "https://course.fast.ai/"
          }
        ],
        projects: ["ML Model Deployment", "API Development"],
        internships: [
          "https://www.microsoft.com/en-us/research/academic-program/microsoft-research-ai-residency-program/",
          "https://www.amazon.jobs/en/teams/ai"
        ],
        jobs: [
          "https://www.glassdoor.com/Job/machine-learning-engineer-jobs-SRCH_KO0,27.htm",
          "https://jobs.lever.co/"
        ],
        masters: "Look at MIT, CMU, IISc for M.Tech/MS in AI and ML.",
        duration: "2-3 months"
      },
      {
        title: "Level 2 – ML Systems",
        courses: [
          {
            name: "MLOps Specialization",
            link: "https://www.coursera.org/specializations/mlops-machine-learning-duke"
          },
          {
            name: "Full Stack Deep Learning",
            link: "https://fullstackdeeplearning.com/"
          }
        ],
        projects: ["ML Pipeline Building", "Model Versioning System"],
        internships: [
          "https://careers.nvidia.com/",
          "https://www.apple.com/careers/us/students.html"
        ],
        jobs: [
          "https://www.upwork.com/freelance-jobs/ml-engineering/",
          "https://weworkremotely.com/"
        ],
        masters: "Consider specialized ML Engineering programs at EPFL or Oxford.",
        duration: "3-4 months"
      },
      {
        title: "Level 3 – Production ML",
        courses: [
          {
            name: "Designing Machine Learning Systems",
            link: "https://learning.oreilly.com/library/view/designing-machine-learning/9781098107956/"
          },
          {
            name: "TensorFlow Developer Certificate",
            link: "https://www.tensorflow.org/certificate"
          }
        ],
        projects: ["Real-time ML Service", "A/B Testing Framework"],
        internships: [
          "https://waymo.com/careers/",
          "https://openai.com/careers/"
        ],
        jobs: [
          "https://www.uber.com/us/en/careers/",
          "https://www.tesla.com/careers/search/"
        ],
        masters: "Consider industry-sponsored MS programs that allow part-time study.",
        duration: "4-5 months"
      },
      {
        title: "Level 4 – ML Infrastructure",
        courses: [
          {
            name: "Machine Learning Systems Design",
            link: "https://stanford-cs329s.github.io/"
          },
          {
            name: "Large Scale Machine Learning",
            link: "https://www.coursera.org/learn/ml-fundamentals"
          }
        ],
        projects: ["Distributed Training System", "ML Platform Features"],
        internships: [
          "https://databricks.com/company/careers/open-positions",
          "https://www.intel.com/content/www/us/en/jobs/jobs-at-intel.html"
        ],
        jobs: [
          "https://www.airbnb.com/careers",
          "https://twitter.com/careers"
        ],
        masters: "Research-focused programs that allow industry collaboration would be ideal.",
        duration: "5-6 months"
      },
      {
        title: "Level 5 – ML Leadership",
        courses: [
          {
            name: "Deep Learning at Scale",
            link: "https://www.nvidia.com/en-us/training/"
          },
          {
            name: "AI Product Management",
            link: "https://www.coursera.org/learn/ai-product-management-duke"
          }
        ],
        projects: ["ML Platform Architecture", "Team ML Project"],
        internships: [
          "https://deepmind.com/careers/internships",
          "https://research.google/"
        ],
        jobs: [
          "https://ai.meta.com/",
          "https://www.apple.com/careers/us/"
        ],
        masters: "Consider executive education in ML leadership or part-time MBA with ML focus.",
        duration: "6+ months"
      }
    ]
  },
  "UI/UX Designer": {
    title: "UI/UX Designer",
    description: "Create intuitive, engaging user interfaces and experiences for digital products.",
    salaryRange: "₹5L - ₹20L per annum",
    skills: ["Figma/Adobe XD", "User Research", "Interaction Design", "Visual Design", "Prototyping"],
    levels: [
      {
        title: "Level 1 – UI/UX Basics",
        courses: [
          {
            name: "Google UX Design Certificate",
            link: "https://www.coursera.org/professional-certificates/google-ux-design"
          },
          {
            name: "Figma UX Design Tutorial",
            link: "https://www.youtube.com/watch?v=4W4LvJnNegU"
          }
        ],
        projects: ["Personal Portfolio", "App Redesign"],
        internships: [
          "https://dribbble.com/jobs",
          "https://internshala.com/internships/ui-ux-design-internship"
        ],
        jobs: [
          "https://www.behance.net/joblist",
          "https://angel.co/jobs"
        ],
        masters: "Target HCI/UI MS at Georgia Tech, University of Washington, and IIIT-H.",
        duration: "2-3 months"
      },
      {
        title: "Level 2 – Interactive Design",
        courses: [
          {
            name: "Interaction Design Specialization",
            link: "https://www.coursera.org/specializations/interaction-design"
          },
          {
            name: "UI Animation Fundamentals",
            link: "https://www.udemy.com/course/ui-animation-fundamentals/"
          }
        ],
        projects: ["Interactive Prototype", "Microinteractions Collection"],
        internships: [
          "https://www.designinternships.com/",
          "https://www.invisionapp.com/company/careers"
        ],
        jobs: [
          "https://www.toptal.com/designers",
          "https://remoteco.com/"
        ],
        masters: "Look into specialized interaction design programs at NYU or RCA London.",
        duration: "3-4 months"
      },
      {
        title: "Level 3 – UX Research",
        courses: [
          {
            name: "UX Research Methods",
            link: "https://www.interaction-design.org/courses/user-research-methods-and-best-practices"
          },
          {
            name: "Information Architecture",
            link: "https://www.lynda.com/Information-Architecture-tutorials/Information-Architecture-Basics/164719-2.html"
          }
        ],
        projects: ["User Research Study", "Usability Testing Report"],
        internships: [
          "https://about.google/careers/applications/",
          "https://www.apple.com/careers/us/design.html"
        ],
        jobs: [
          "https://www.nngroup.com/careers/",
          "https://www.usertesting.com/careers"
        ],
        masters: "Consider MS in Human-Computer Interaction at CMU or Stanford.",
        duration: "4-5 months"
      },
      {
        title: "Level 4 – Design Systems",
        courses: [
          {
            name: "Design Systems for Developers",
            link: "https://www.learnstorybook.com/design-systems-for-developers/"
          },
          {
            name: "Advanced UI Architecture",
            link: "https://frontendmasters.com/courses/advanced-ui-styling/"
          }
        ],
        projects: ["Design System Creation", "Component Library"],
        internships: [
          "https://www.airbnb.com/careers/departments/design",
          "https://www.spotify.com/us/jobs/design/"
        ],
        jobs: [
          "https://www.microsoft.com/en-us/design/jobs",
          "https://www.ibm.com/design/careers/"
        ],
        masters: "Look at specialized programs in design systems at California College of the Arts.",
        duration: "5-6 months"
      },
      {
        title: "Level 5 – UX Leadership",
        courses: [
          {
            name: "UX Management: Strategy and Tactics",
            link: "https://www.interaction-design.org/courses/ux-management-strategy-and-tactics"
          },
          {
            name: "Design Leadership",
            link: "https://www.designbetter.co/design-leadership-handbook"
          }
        ],
        projects: ["UX Strategy Document", "Team Design Challenge"],
        internships: [
          "https://design.facebook.com/careers/",
          "https://careers.twitter.com/content/careers-twitter/en/jobs.html#design"
        ],
        jobs: [
          "https://www.designmanagementinstitute.org/resources/career/",
          "https://www.linkedin.com/jobs/design-leadership-jobs/"
        ],
        masters: "Executive education in design leadership or specialized MBA programs.",
        duration: "6+ months"
      }
    ]
  },
  "AI Research Scientist": {
    title: "AI Research Scientist",
    description: "Advance AI theory and applications through innovative research.",
    salaryRange: "₹10L - ₹40L per annum",
    skills: ["Deep Learning", "Mathematical Modeling", "Research Methods", "Python/C++", "Technical Writing"],
    levels: [
      {
        title: "Level 1 – Research Basics",
        courses: [
          {
            name: "Stanford CS231n – Vision",
            link: "http://cs231n.stanford.edu/"
          },
          {
            name: "Reinforcement Learning – David Silver",
            link: "https://www.davidsilver.uk/teaching/"
          }
        ],
        projects: ["Research Paper Review", "Algorithm Implementation"],
        internships: [
          "https://openai.com/research/",
          "https://www.deepmind.com/careers"
        ],
        jobs: [
          "https://www.simplyhired.com/",
          "https://jobs.github.com/"
        ],
        masters: "Apply to research-based MS at Stanford, Oxford, or IISc Bangalore (MS by Research).",
        duration: "2-3 months"
      },
      {
        title: "Level 2 – Research Methods",
        courses: [
          {
            name: "Machine Learning Research",
            link: "https://www.cs.ox.ac.uk/teaching/courses/2019-2020/ml/"
          },
          {
            name: "Deep Learning Research",
            link: "https://d2l.ai/"
          }
        ],
        projects: ["Literature Survey", "Research Proposal"],
        internships: [
          "https://research.fb.com/",
          "https://research.google/careers/"
        ],
        jobs: [
          "https://www.nvidia.com/en-us/research/",
          "https://jobs.netflix.com/teams/research"
        ],
        masters: "Apply for research assistantships at top schools to fund your education.",
        duration: "3-4 months"
      },
      {
        title: "Level 3 – Paper Publication",
        courses: [
          {
            name: "How to Write Research Papers",
            link: "https://www.coursera.org/learn/sciwrite"
          },
          {
            name: "Advanced Topics in ML",
            link: "https://www.cs.cmu.edu/~rsalakhu/10707/"
          }
        ],
        projects: ["Original Research Paper", "Conference Submission"],
        internships: [
          "https://www.amazon.science/",
          "https://www.microsoft.com/en-us/research/"
        ],
        jobs: [
          "https://builtin.com/artificial-intelligence",
          "https://jobs.ieee.org/"
        ],
        masters: "Consider PhD programs with strong AI research focus.",
        duration: "4-5 months"
      },
      {
        title: "Level 4 – Research Communication",
        courses: [
          {
            name: "Scientific Communication",
            link: "https://www.edx.org/course/scientific-communication-strategies-to-succeed"
          },
          {
            name: "Ethics in AI Research",
            link: "https://www.edx.org/course/ethics-in-ai"
          }
        ],
        projects: ["Research Presentation", "Workshop Organization"],
        internships: [
          "https://ai.facebook.com/",
          "https://jobs.apple.com/en-us/search?team=machine-learning-and-ai"
        ],
        jobs: [
          "https://research.ibm.com/artificial-intelligence",
          "https://careers.intel.com/us/en/ai-jobs"
        ],
        masters: "Apply for research fellowships and consider visiting researcher positions.",
        duration: "5-6 months"
      },
      {
        title: "Level 5 – Research Leadership",
        courses: [
          {
            name: "Research Team Management",
            link: "https://www.nature.com/nature-masterclasses/focus/managing-research-teams"
          },
          {
            name: "Grant Writing for Research",
            link: "https://www.coursera.org/learn/grant-writing"
          }
        ],
        projects: ["Research Agenda", "Collaborative Research"],
        internships: [
          "https://research.apple.com/",
          "https://www.tesla.com/careers/search/#machine=learning"
        ],
        jobs: [
          "https://ai.google/research/join-us/",
          "https://www.deepmind.com/careers/opportunities"
        ],
        masters: "Consider postdoc positions or faculty roles at research institutions.",
        duration: "6+ months"
      }
    ]
  }
};
