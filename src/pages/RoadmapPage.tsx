
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Award, BookOpen, Code, Lightbulb, Target, Trophy, Star } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'project' | 'quiz' | 'milestone';
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  completed: boolean;
  locked: boolean;
  skills: string[];
  points: number;
  certificateId?: string;
}

const RoadmapPage = () => {
  const { userProfile, updateProfile } = useAuth();
  const [roadmapSteps, setRoadmapSteps] = useState<RoadmapStep[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load completed steps from localStorage
    const saved = localStorage.getItem('pathpilot_completed_steps');
    if (saved) {
      setCompletedSteps(new Set(JSON.parse(saved)));
    }

    // Initialize roadmap based on user's career path
    const careerPath = userProfile?.careerPath || 'Software Development';
    initializeRoadmap(careerPath);
  }, [userProfile]);

  const initializeRoadmap = (careerPath: string) => {
    const baseSteps: RoadmapStep[] = [
      {
        id: 'intro-programming',
        title: 'Introduction to Programming',
        description: 'Learn the fundamentals of programming concepts',
        type: 'course',
        duration: '2 weeks',
        difficulty: 'Beginner',
        completed: false,
        locked: false,
        skills: ['Programming Basics', 'Logic', 'Problem Solving'],
        points: 100,
        certificateId: 'cert-intro-programming'
      },
      {
        id: 'first-project',
        title: 'Build Your First Project',
        description: 'Apply what you learned in a hands-on project',
        type: 'project',
        duration: '1 week',
        difficulty: 'Beginner',
        completed: false,
        locked: true,
        skills: ['Project Management', 'Implementation'],
        points: 150,
        certificateId: 'cert-first-project'
      },
      {
        id: 'intermediate-concepts',
        title: 'Intermediate Programming Concepts',
        description: 'Dive deeper into advanced programming topics',
        type: 'course',
        duration: '3 weeks',
        difficulty: 'Intermediate',
        completed: false,
        locked: true,
        skills: ['Data Structures', 'Algorithms', 'OOP'],
        points: 200
      },
      {
        id: 'quiz-assessment',
        title: 'Programming Assessment Quiz',
        description: 'Test your knowledge with a comprehensive quiz',
        type: 'quiz',
        duration: '30 minutes',
        difficulty: 'Intermediate',
        completed: false,
        locked: true,
        skills: ['Assessment', 'Knowledge Verification'],
        points: 75
      },
      {
        id: 'capstone-project',
        title: 'Capstone Project',
        description: 'Build a comprehensive project showcasing your skills',
        type: 'project',
        duration: '4 weeks',
        difficulty: 'Advanced',
        completed: false,
        locked: true,
        skills: ['Full Stack Development', 'Project Leadership'],
        points: 300,
        certificateId: 'cert-capstone'
      },
      {
        id: 'career-milestone',
        title: 'Career Ready Milestone',
        description: 'You are now ready for entry-level positions!',
        type: 'milestone',
        duration: 'Achievement',
        difficulty: 'Advanced',
        completed: false,
        locked: true,
        skills: ['Career Readiness', 'Professional Development'],
        points: 500,
        certificateId: 'cert-career-ready'
      }
    ];

    // Update locked status based on completed steps
    const updatedSteps = baseSteps.map((step, index) => {
      const isCompleted = completedSteps.has(step.id);
      const shouldUnlock = index === 0 || 
        baseSteps.slice(0, index).every(prevStep => completedSteps.has(prevStep.id));
      
      return {
        ...step,
        completed: isCompleted,
        locked: !shouldUnlock
      };
    });

    setRoadmapSteps(updatedSteps);
  };

  const completeStep = (stepId: string) => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(stepId);
    setCompletedSteps(newCompleted);
    
    // Save to localStorage
    localStorage.setItem('pathpilot_completed_steps', JSON.stringify([...newCompleted]));
    
    // Update roadmap to unlock next steps
    const updatedSteps = roadmapSteps.map((step, index) => {
      if (step.id === stepId) {
        return { ...step, completed: true };
      }
      
      // Check if this step should be unlocked
      const shouldUnlock = index === 0 || 
        roadmapSteps.slice(0, index).every(prevStep => 
          newCompleted.has(prevStep.id) || prevStep.id === stepId
        );
      
      return { ...step, locked: !shouldUnlock };
    });
    
    setRoadmapSteps(updatedSteps);
    
    // Find the completed step and award points
    const completedStep = roadmapSteps.find(step => step.id === stepId);
    if (completedStep && userProfile) {
      const currentPoints = userProfile.points || 0;
      const updatedProfile = {
        ...userProfile,
        points: currentPoints + completedStep.points
      };
      updateProfile(updatedProfile);
      
      // Generate certificate if applicable
      if (completedStep.certificateId) {
        generateCertificate(completedStep);
      }
      
      toast({
        title: "🎉 Step Completed!",
        description: `You earned ${completedStep.points} points!`,
      });
    }
  };

  const generateCertificate = (step: RoadmapStep) => {
    if (!step.certificateId) return;
    
    const certificate = {
      id: step.certificateId,
      title: `Certificate of Completion - ${step.title}`,
      description: `Successfully completed ${step.title}`,
      issueDate: new Date().toISOString(),
      type: step.type,
      skills: step.skills
    };
    
    // Save certificate to localStorage
    const existingCerts = JSON.parse(localStorage.getItem('pathpilot_certificates') || '[]');
    const updatedCerts = [...existingCerts, certificate];
    localStorage.setItem('pathpilot_certificates', JSON.stringify(updatedCerts));
    
    toast({
      title: "🏅 Certificate Earned!",
      description: `Certificate added to your profile!`,
    });
  };

  const getStepIcon = (type: string, completed: boolean) => {
    const iconProps = { className: `h-6 w-6 ${completed ? 'text-green-500' : 'text-muted-foreground'}` };
    
    switch (type) {
      case 'course':
        return <BookOpen {...iconProps} />;
      case 'project':
        return <Code {...iconProps} />;
      case 'quiz':
        return <Lightbulb {...iconProps} />;
      case 'milestone':
        return <Trophy {...iconProps} />;
      default:
        return <Target {...iconProps} />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const calculateProgress = () => {
    if (roadmapSteps.length === 0) return 0;
    return (completedSteps.size / roadmapSteps.length) * 100;
  };

  const totalPoints = roadmapSteps
    .filter(step => completedSteps.has(step.id))
    .reduce((sum, step) => sum + step.points, 0);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Your Learning Roadmap</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Follow this personalized path to achieve your career goals
          </p>
          
          {/* Progress Overview */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Progress Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Overall Progress</span>
                    <span>{Math.round(calculateProgress())}%</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{completedSteps.size}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-500">{roadmapSteps.length - completedSteps.size}</div>
                    <div className="text-sm text-muted-foreground">Remaining</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">{totalPoints}</div>
                    <div className="text-sm text-muted-foreground">Points Earned</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roadmap Steps */}
        <div className="space-y-6">
          {roadmapSteps.map((step, index) => (
            <Card 
              key={step.id} 
              className={`transition-all duration-300 ${
                step.completed 
                  ? 'border-green-500 bg-green-50 dark:bg-green-950/20' 
                  : step.locked 
                    ? 'opacity-60 bg-muted/50' 
                    : 'hover:shadow-lg'
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {step.completed ? (
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-6 w-6 text-white" />
                        </div>
                      ) : (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.locked ? 'bg-muted' : 'bg-primary/10'
                        }`}>
                          {getStepIcon(step.type, step.completed)}
                        </div>
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {step.certificateId && (
                      <Award className="h-5 w-5 text-yellow-500" />
                    )}
                    <Badge className={getDifficultyColor(step.difficulty)}>
                      {step.difficulty}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Duration: {step.duration}</span>
                    <span>Points: {step.points}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {step.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => completeStep(step.id)}
                      disabled={step.locked || step.completed}
                      className="flex-1"
                      variant={step.completed ? "outline" : "default"}
                    >
                      {step.completed ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Completed
                        </>
                      ) : step.locked ? (
                        'Locked'
                      ) : (
                        'Start Step'
                      )}
                    </Button>
                  </div>
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
