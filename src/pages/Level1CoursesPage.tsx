
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, ExternalLink, Award, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  platform: string;
  url: string;
  thumbnail: string;
  description: string;
}

const Level1CoursesPage = () => {
  const [completedCourses, setCompletedCourses] = useState<Set<string>>(new Set());
  const navigate = useNavigate();

  const courses: Course[] = [
    {
      id: 'html-css-freecodecamp',
      title: 'HTML & CSS – Responsive Web Design Certification',
      platform: 'freeCodeCamp',
      url: 'https://www.freecodecamp.org/learn/responsive-web-design',
      thumbnail: '/placeholder.svg',
      description: 'Learn HTML and CSS fundamentals to build responsive websites'
    },
    {
      id: 'javascript-mosh',
      title: 'JavaScript – JavaScript Full Course for Beginners',
      platform: 'YouTube - Mosh',
      url: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
      thumbnail: '/placeholder.svg',
      description: 'Complete JavaScript course covering all fundamentals'
    },
    {
      id: 'python-freecodecamp',
      title: 'Python – Python for Beginners – Full Course',
      platform: 'YouTube - freeCodeCamp',
      url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
      thumbnail: '/placeholder.svg',
      description: 'Learn Python programming from scratch'
    },
    {
      id: 'git-github-freecodecamp',
      title: 'Git & GitHub – Git and GitHub Crash Course',
      platform: 'YouTube - freeCodeCamp',
      url: 'https://www.youtube.com/watch?v=RGOj5yH7evk',
      thumbnail: '/placeholder.svg',
      description: 'Master version control with Git and GitHub'
    },
    {
      id: 'cs50-harvard',
      title: 'Computer Science – CS50\'s Introduction to Computer Science',
      platform: 'edX - Harvard',
      url: 'https://cs50.harvard.edu/x/',
      thumbnail: '/placeholder.svg',
      description: 'Harvard\'s famous introduction to computer science'
    },
    {
      id: 'uiux-ajsmart',
      title: 'UI/UX Design – UI/UX Design Crash Course',
      platform: 'YouTube - AJ&Smart',
      url: 'https://www.youtube.com/watch?v=_QkuxR3qFwo',
      thumbnail: '/placeholder.svg',
      description: 'Learn UI/UX design principles and best practices'
    },
    {
      id: 'career-planning-simplilearn',
      title: 'Career Planning – Resume + LinkedIn + Interview Skills',
      platform: 'YouTube - Simplilearn',
      url: 'https://www.youtube.com/watch?v=ZOVCKxL0EYY',
      thumbnail: '/placeholder.svg',
      description: 'Build professional resume, LinkedIn profile, and interview skills'
    }
  ];

  useEffect(() => {
    // Load completed courses from localStorage
    const saved = localStorage.getItem('pathpilot_level1_completed');
    if (saved) {
      setCompletedCourses(new Set(JSON.parse(saved)));
    }
  }, []);

  const markAsCompleted = (courseId: string) => {
    const newCompleted = new Set(completedCourses);
    newCompleted.add(courseId);
    setCompletedCourses(newCompleted);
    
    // Save to localStorage
    localStorage.setItem('pathpilot_level1_completed', JSON.stringify([...newCompleted]));
    
    const course = courses.find(c => c.id === courseId);
    
    toast({
      title: "🎉 Course Completed!",
      description: `Great job completing "${course?.title}"!`,
    });

    // Check if all courses are completed
    if (newCompleted.size === courses.length) {
      toast({
        title: "🏆 Level 1 Complete!",
        description: "Congratulations! You've completed all Level 1 courses. Ready for Level 2?",
      });
    }
  };

  const unmarkCompleted = (courseId: string) => {
    const newCompleted = new Set(completedCourses);
    newCompleted.delete(courseId);
    setCompletedCourses(newCompleted);
    
    // Save to localStorage
    localStorage.setItem('pathpilot_level1_completed', JSON.stringify([...newCompleted]));
    
    toast({
      title: "Course unmarked",
      description: "Course removed from completed list.",
    });
  };

  const progressPercentage = (completedCourses.size / courses.length) * 100;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/roadmap')}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Roadmap
          </Button>
          
          <h1 className="text-4xl font-bold mb-4">Level 1: Foundation Courses</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Start your programming journey with these beginner-friendly courses
          </p>
          
          {/* Progress Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Courses Completed</span>
                    <span>{completedCourses.size} / {courses.length}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{completedCourses.size}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">{courses.length - completedCourses.size}</div>
                    <div className="text-sm text-muted-foreground">Remaining</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => {
            const isCompleted = completedCourses.has(course.id);
            
            return (
              <Card 
                key={course.id} 
                className={`transition-all duration-300 ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                    : 'hover:shadow-lg'
                }`}
              >
                <CardHeader>
                  <div className="relative">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                    {isCompleted && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-green-500 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Done
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="mb-2">
                      {course.platform}
                    </Badge>
                    <p className="text-sm">{course.description}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(course.url, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Start Course
                    </Button>
                    
                    {isCompleted ? (
                      <Button
                        variant="outline"
                        className="w-full border-green-500 text-green-600"
                        onClick={() => unmarkCompleted(course.id)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Completed
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        onClick={() => markAsCompleted(course.id)}
                      >
                        Mark as Completed
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Completion Badge */}
        {completedCourses.size === courses.length && (
          <Card className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-500">
            <CardContent className="text-center py-8">
              <Award className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                🎉 Level 1 Complete!
              </h3>
              <p className="text-green-600 dark:text-green-300 mb-4">
                Congratulations! You've completed all foundation courses.
              </p>
              <Button onClick={() => navigate('/roadmap')}>
                Continue to Level 2
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Level1CoursesPage;
