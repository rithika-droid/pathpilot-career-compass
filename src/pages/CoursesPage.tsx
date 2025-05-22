
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Clock, Award, CheckCircle, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CoursesPage = () => {
  const courses = [
    {
      id: 1,
      title: "Fundamentals of Programming",
      description: "Learn the core concepts of computer programming that apply across all languages.",
      level: "Beginner",
      duration: "8 weeks",
      lessons: 24,
      progress: 100,
      completed: true,
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2831&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      description: "Master the essential data structures and algorithms used in software development.",
      level: "Intermediate",
      duration: "10 weeks",
      lessons: 32,
      progress: 75,
      completed: false,
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Full-Stack Web Development",
      description: "Build complete web applications using modern frameworks and tools.",
      level: "Advanced",
      duration: "12 weeks",
      lessons: 40,
      progress: 45,
      completed: false,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Machine Learning Essentials",
      description: "Understand the fundamentals of machine learning and build practical models.",
      level: "Intermediate",
      duration: "10 weeks",
      lessons: 28,
      progress: 20,
      completed: false,
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=2940&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "Cloud Computing and DevOps",
      description: "Learn to deploy, scale, and manage applications in the cloud.",
      level: "Advanced",
      duration: "8 weeks",
      lessons: 24,
      progress: 0,
      completed: false,
      image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?q=80&w=2911&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Cybersecurity Principles",
      description: "Master the fundamentals of securing systems and applications.",
      level: "Intermediate",
      duration: "9 weeks",
      lessons: 27,
      progress: 0,
      completed: false,
      image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?q=80&w=2940&auto=format&fit=crop"
    }
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Courses</h1>
          <p className="text-xl text-muted-foreground">
            Track your progress and continue learning
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-0 right-0 p-2">
                  <Badge variant={course.completed ? "default" : "secondary"} className="font-medium">
                    {course.level}
                  </Badge>
                </div>
                {course.completed && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                    <div className="rounded-full bg-green-500 p-4">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                <CardDescription className="line-clamp-2">{course.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span>{course.lessons} Lessons</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </CardContent>
              
              <CardFooter>
                <Button className="w-full" disabled={course.progress === 0}>
                  {course.progress === 0 ? (
                    "Start Course"
                  ) : course.completed ? (
                    <>
                      <Award className="mr-2 h-4 w-4" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Play className="mr-2 h-4 w-4" />
                      Continue Learning
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursesPage;
