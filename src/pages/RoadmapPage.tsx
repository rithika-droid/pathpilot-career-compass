
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '../hooks/useAuth';
import { Route as RouteIcon, CheckCircle, Circle } from 'lucide-react';

const RoadmapPage = () => {
  const { user } = useAuth();
  const profile = user?.profile;
  
  if (!profile?.careerPath) {
    return <div>Loading...</div>;
  }
  
  const roadmapSteps = [
    {
      level: 1,
      title: "Foundation",
      description: "Build core skills and fundamentals",
      complete: true,
      current: false,
      steps: [
        { name: "Programming Basics", complete: true },
        { name: "Data Structures", complete: true },
        { name: "Web Technologies", complete: true },
      ]
    },
    {
      level: 2,
      title: "Specialization",
      description: "Focus on your chosen tech path",
      complete: true,
      current: false,
      steps: [
        { name: "Advanced Algorithms", complete: true },
        { name: "Framework Mastery", complete: true },
        { name: "Project Work", complete: true },
      ]
    },
    {
      level: 3,
      title: "Application",
      description: "Apply skills to real-world projects",
      complete: false,
      current: true,
      steps: [
        { name: "Industry Project", complete: true },
        { name: "Technical Documentation", complete: false },
        { name: "Performance Optimization", complete: false },
      ]
    },
    {
      level: 4,
      title: "Mastery",
      description: "Deepen expertise and leadership",
      complete: false,
      current: false,
      steps: [
        { name: "System Design", complete: false },
        { name: "Advanced Architecture", complete: false },
        { name: "Team Collaboration", complete: false },
      ]
    },
    {
      level: 5,
      title: "Innovation",
      description: "Create and lead new solutions",
      complete: false,
      current: false,
      steps: [
        { name: "Research & Development", complete: false },
        { name: "Industry Leadership", complete: false },
        { name: "Mentorship", complete: false },
      ]
    }
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Career Roadmap</h1>
          <p className="text-xl text-muted-foreground">
            Step-by-step guide to becoming a <span className="text-primary font-semibold">{profile.careerPath}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-10">
          {roadmapSteps.map((level, index) => (
            <Card key={index} className={`
              border-l-4 
              ${level.complete ? 'border-l-green-500' : level.current ? 'border-l-primary' : 'border-l-muted'} 
              ${level.current ? 'ring-2 ring-primary/20' : ''}
            `}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`
                  rounded-full w-14 h-14 flex items-center justify-center text-2xl font-bold
                  ${level.complete ? 'bg-green-500 text-white' : level.current ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
                `}>
                  {level.level}
                </div>
                
                <div>
                  <CardTitle className="text-2xl mb-1">{level.title}</CardTitle>
                  <p className="text-muted-foreground">{level.description}</p>
                </div>
              </CardHeader>
              
              <CardContent className="pl-20">
                <div className="space-y-4">
                  {level.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-3">
                      {step.complete ? 
                        <CheckCircle className="h-5 w-5 text-green-500" /> : 
                        <Circle className="h-5 w-5 text-muted-foreground" />
                      }
                      <span className={step.complete ? '' : 'text-muted-foreground'}>
                        {step.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-end">
                  {level.current && (
                    <div className="inline-flex gap-2 items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm">
                      <RouteIcon className="h-4 w-4" />
                      <span>Current Level</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default RoadmapPage;
