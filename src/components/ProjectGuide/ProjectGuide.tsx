import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CheckCircle, Code, ExternalLink, FileText, Globe, Monitor, Settings, Zap } from 'lucide-react';

interface ProjectGuideProps {
  projectId: string;
  onBack: () => void;
}

interface GuideSection {
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const ProjectGuide: React.FC<ProjectGuideProps> = ({
  projectId,
  onBack
}) => {
  const [currentSection, setCurrentSection] = useState(0);

  const getProjectGuide = (id: string): GuideSection[] => {
    switch (id) {
      case 'portfolio-website':
        return [{
          title: "Introduction & Overview",
          icon: <FileText className="h-5 w-5" />,
          content: <div className="space-y-4">
                <p className="text-lg text-gray-900 dark:text-gray-100">Build a professional portfolio website to showcase your skills, projects, and achievements.</p>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🎯 Project Goals:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
                    <li>Create a responsive personal portfolio</li>
                    <li>Showcase your projects and skills</li>
                    <li>Learn modern web development practices</li>
                    <li>Build something you can use professionally</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">💻 Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">HTML5</Badge>
                    <Badge variant="outline">CSS3</Badge>
                    <Badge variant="outline">JavaScript</Badge>
                    <Badge variant="outline">Responsive Design</Badge>
                  </div>
                  <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">These technologies provide a solid foundation for modern web development and are essential skills for any developer.</p>
                </div>
              </div>
        }, {
          title: "Prerequisites & Setup",
          icon: <Settings className="h-5 w-5" />,
          content: <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">📋 Prerequisites:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
                    <li>Basic understanding of HTML, CSS, and JavaScript</li>
                    <li>Text editor (VS Code recommended)</li>
                    <li>Web browser for testing</li>
                    <li>Basic knowledge of file management</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🛠️ Setup Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-800 dark:text-gray-200">
                    <li>Create a new folder called "my-portfolio"</li>
                    <li>Open the folder in VS Code</li>
                    <li>Create the following files:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>index.html</li>
                        <li>styles.css</li>
                        <li>script.js</li>
                      </ul>
                    </li>
                    <li>Create an "images" folder for your photos and project screenshots</li>
                  </ol>
                </div>
              </div>
        }, {
          title: "Step-by-Step Instructions",
          icon: <Code className="h-5 w-5" />,
          content: <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 1: HTML Structure</h4>
                  <p className="mb-2 text-gray-800 dark:text-gray-200">Create the basic HTML structure in index.html:</p>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Name - Portfolio</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav>
        <div class="nav-container">
            <div class="logo">Your Name</div>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <h1>Hi, I'm Your Name</h1>
            <p>Web Developer & Designer</p>
            <button class="cta-button">View My Work</button>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2>About Me</h2>
            <p>Write a brief description about yourself...</p>
        </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="projects">
        <div class="container">
            <h2>My Projects</h2>
            <div class="project-grid">
                <!-- Projects will be added here -->
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2>Get In Touch</h2>
            <p>Email: your.email@example.com</p>
        </div>
    </section>

    <script src="script.js"></script>
</body>
</html>`}</pre>
                  </div>
                </div>

                <div className="border-l-4 border-green-500 pl-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 2: CSS Styling</h4>
                  <p className="mb-2 text-gray-800 dark:text-gray-200">Add responsive styling in styles.css:</p>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: #333;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
nav {
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #2c3e50;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: #333;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: #3498db;
}

/* Hero Section */
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
}

.hero h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.hero p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

.cta-button {
    background: #fff;
    color: #667eea;
    border: none;
    padding: 12px 30px;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.3s;
}

.cta-button:hover {
    transform: translateY(-2px);
}

/* Sections */
section {
    padding: 80px 0;
}

.about, .projects, .contact {
    text-align: center;
}

h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    color: #2c3e50;
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        flex-direction: column;
        gap: 1rem;
    }
    
    .hero h1 {
        font-size: 2rem;
    }
    
    .nav-container {
        flex-direction: column;
    }
}`}</pre>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-r-lg border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">Step 3: JavaScript Functionality</h4>
                  <p className="mb-2 text-gray-800 dark:text-gray-200">Add interactive features in script.js:</p>
                  <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // CTA Button functionality
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            document.querySelector('#projects').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            nav.style.background = '#fff';
        }
    });
});`}</pre>
                  </div>
                </div>
              </div>
        }, {
          title: "Key Functionalities & Features",
          icon: <Zap className="h-5 w-5" />,
          content: <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🎨 Responsive Design</h4>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Use CSS media queries to ensure your portfolio looks great on all devices.</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">Mobile-First</Badge>
                      <Badge variant="outline" className="text-xs ml-1">Flexbox</Badge>
                    </div>
                  </div>
                  <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                    <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">⚡ Smooth Scrolling</h4>
                    <p className="text-sm text-gray-800 dark:text-gray-200">Implement smooth navigation between sections for better user experience.</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="text-xs">JavaScript</Badge>
                      <Badge variant="outline" className="text-xs ml-1">UX</Badge>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">💡 Best Practices:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-800 dark:text-gray-200">
                    <li>Use semantic HTML elements for better accessibility</li>
                    <li>Optimize images for web (compress and use appropriate formats)</li>
                    <li>Test on multiple devices and browsers</li>
                    <li>Keep the design clean and professional</li>
                    <li>Include your best projects and skills</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">⚠️ Common Pitfalls to Avoid:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-800 dark:text-gray-200">
                    <li>Don't overload with too many animations</li>
                    <li>Avoid using too many different fonts</li>
                    <li>Don't forget to test mobile responsiveness</li>
                    <li>Avoid broken links or missing images</li>
                  </ul>
                </div>
              </div>
        }, {
          title: "Testing & Troubleshooting",
          icon: <Monitor className="h-5 w-5" />,
          content: <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">✅ Testing Checklist:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
                    <li>Open index.html in your browser</li>
                    <li>Test navigation links work properly</li>
                    <li>Verify responsive design on different screen sizes</li>
                    <li>Check that images load correctly</li>
                    <li>Test smooth scrolling functionality</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🔧 Troubleshooting Common Issues:</h4>
                  <div className="space-y-3 text-gray-800 dark:text-gray-200">
                    <div>
                      <p className="font-medium">CSS not loading:</p>
                      <p className="text-sm">Check the file path in your HTML link tag</p>
                    </div>
                    <div>
                      <p className="font-medium">Images not showing:</p>
                      <p className="text-sm">Verify image file paths and names are correct</p>
                    </div>
                    <div>
                      <p className="font-medium">JavaScript not working:</p>
                      <p className="text-sm">Open browser developer tools (F12) to check for console errors</p>
                    </div>
                  </div>
                </div>
              </div>
        }, {
          title: "Finalization & Deployment",
          icon: <Globe className="h-5 w-5" />,
          content: <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🚀 Deployment Options:</h4>
                  <div className="space-y-3 text-gray-800 dark:text-gray-200">
                    <div>
                      <p className="font-medium">GitHub Pages (Free):</p>
                      <ol className="list-decimal list-inside text-sm ml-4">
                        <li>Create a GitHub repository</li>
                        <li>Upload your files</li>
                        <li>Enable GitHub Pages in settings</li>
                        <li>Your site will be live at username.github.io/repository-name</li>
                      </ol>
                    </div>
                    <div>
                      <p className="font-medium">Netlify (Free):</p>
                      <ol className="list-decimal list-inside text-sm ml-4">
                        <li>Drag and drop your folder to netlify.com</li>
                        <li>Get an instant live URL</li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🎯 Enhancement Ideas:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-800 dark:text-gray-200">
                    <li>Add a contact form with form validation</li>
                    <li>Include a blog section</li>
                    <li>Add animations and transitions</li>
                    <li>Integrate social media links</li>
                    <li>Add a dark mode toggle</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => window.open('https://pages.github.com/', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    GitHub Pages Guide
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => window.open('https://www.netlify.com/', '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Netlify
                  </Button>
                </div>
              </div>
        }];
      case 'todo-app':
        return [{
          title: "Introduction & Overview",
          icon: <FileText className="h-5 w-5" />,
          content: <div className="space-y-4">
                <p className="text-lg text-gray-900 dark:text-gray-100">Build a fully functional to-do application with local storage persistence.</p>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🎯 Project Goals:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
                    <li>Create a task management application</li>
                    <li>Learn local storage and data persistence</li>
                    <li>Implement CRUD operations</li>
                    <li>Build a responsive user interface</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">💻 Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">HTML5</Badge>
                    <Badge variant="outline">CSS3</Badge>
                    <Badge variant="outline">JavaScript</Badge>
                    <Badge variant="outline">Local Storage API</Badge>
                  </div>
                </div>
              </div>
        }, {
          title: "Prerequisites & Setup",
          icon: <Settings className="h-5 w-5" />,
          content: <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">📋 Prerequisites:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
                    <li>Understanding of JavaScript arrays and objects</li>
                    <li>Knowledge of DOM manipulation</li>
                    <li>Basic CSS styling skills</li>
                    <li>Familiarity with event handling</li>
                  </ul>
                </div>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🛠️ Setup Instructions:</h4>
                  <ol className="list-decimal list-inside space-y-2 text-gray-800 dark:text-gray-200">
                    <li>Create a new folder called "todo-app"</li>
                    <li>Create these files:
                      <ul className="list-disc list-inside ml-4 mt-1">
                        <li>index.html</li>
                        <li>style.css</li>
                        <li>app.js</li>
                      </ul>
                    </li>
                  </ol>
                </div>
              </div>
        }
        // Add more sections for todo-app...
        ];
      case 'quiz-app':
        return [{
          title: "Introduction & Overview",
          icon: <FileText className="h-5 w-5" />,
          content: <div className="space-y-4">
                <p className="text-lg text-gray-900 dark:text-gray-100">Create an interactive quiz application with scoring and feedback.</p>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🎯 Project Goals:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
                    <li>Build an interactive quiz interface</li>
                    <li>Implement scoring system</li>
                    <li>Create dynamic question display</li>
                    <li>Add timer functionality</li>
                  </ul>
                </div>
              </div>
        }
        // Add more sections...
        ];
      case 'blog-github':
        return [{
          title: "Introduction & Overview",
          icon: <FileText className="h-5 w-5" />,
          content: <div className="space-y-4">
                <p className="text-lg text-gray-900 dark:text-gray-100">Create and deploy a personal blog using GitHub Pages and Markdown.</p>
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">🎯 Project Goals:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-800 dark:text-gray-200">
                    <li>Learn Git and GitHub workflow</li>
                    <li>Master Markdown syntax</li>
                    <li>Deploy a live website</li>
                    <li>Create a content management system</li>
                  </ul>
                </div>
              </div>
        }
        // Add more sections...
        ];
      default:
        return [{
          title: "Project Guide Not Found",
          icon: <FileText className="h-5 w-5" />,
          content: <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">This guide is under construction. Please check back later.</p>
                </div>
        }];
    }
  };

  const sections = getProjectGuide(projectId);
  const projectTitles: Record<string, string> = {
    'portfolio-website': 'Portfolio Website using HTML, CSS & JS',
    'todo-app': 'To-Do App with Local Storage',
    'quiz-app': 'Quiz App using JavaScript',
    'blog-github': 'Personal Blog using GitHub Pages'
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        <h1 className="text-3xl font-bold mb-2">{projectTitles[projectId]}</h1>
        <p className="text-muted-foreground">Complete step-by-step project guide</p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-sm font-medium">Progress:</span>
          <span className="text-sm text-muted-foreground">
            {currentSection + 1} of {sections.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Section Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {sections.map((section, index) => (
          <Button
            key={index}
            variant={currentSection === index ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentSection(index)}
            className="flex items-center gap-1 text-xs"
          >
            {currentSection > index && <CheckCircle className="h-3 w-3" />}
            {section.icon}
            <span className="hidden md:inline">{section.title.split(' ')[0]}</span>
          </Button>
        ))}
      </div>

      {/* Current Section Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {sections[currentSection].icon}
            {sections[currentSection].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sections[currentSection].content}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
          disabled={currentSection === sections.length - 1}
        >
          Next
        </Button>
      </div>

      {currentSection === sections.length - 1 && (
        <Card className="mt-6 bg-green-50 dark:bg-green-950/20 border-green-500">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">🎉 Project Complete!</h3>
            <p className="text-muted-foreground mb-4">
              Congratulations! You've completed the {projectTitles[projectId]} guide.
            </p>
            <Button onClick={onBack}>
              View More Projects
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProjectGuide;
