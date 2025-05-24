import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Lock, PlayCircle, Trophy, Target, BookOpen, Award } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { careerPaths } from '../data/careerPaths';
import { useNavigate } from 'react-router-dom';
import QuizComponent from '../components/Quiz/QuizComponent';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const RoadmapPage = () => {
  const { userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizLevel, setQuizLevel] = useState(1);
  const { toast } = useToast();
  
  if (!userProfile?.careerPath) {
    return (
      <MainLayout>
        <div className="container pt-20 px-4 flex flex-col items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>
                Please complete your profile to view your personalized roadmap.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate('/profile-setup')}>
                Set Up Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  const careerPath = careerPaths[userProfile.careerPath];
  const currentLevel = userProfile.level || 1;
  
  if (!careerPath) {
    return (
      <MainLayout>
        <div className="container pt-20 px-4">
          <h1 className="text-3xl font-bold mb-4">Career Roadmap</h1>
          <p>Career path information not available.</p>
        </div>
      </MainLayout>
    );
  }

  const handleQuizComplete = (score: number, passed: boolean) => {
    if (passed && userProfile) {
      const newLevel = Math.min(currentLevel + 1, careerPath.levels.length);
      const newPoints = (userProfile.points || 0) + 100;
      const newBadges = [...(userProfile.badges || [])];
      
      // Add achievement badge for completing level
      const levelBadge = `Level ${currentLevel} Master`;
      if (!newBadges.includes(levelBadge)) {
        newBadges.push(levelBadge);
      }

      // Store certificate in localStorage
      const certificates = JSON.parse(localStorage.getItem('pathpilot_certificates') || '[]');
      const certificateId = `${userProfile.careerPath}-level-${currentLevel}`;
      
      if (!certificates.find((cert: any) => cert.id === certificateId)) {
        const newCertificate = {
          id: certificateId,
          title: `Level ${currentLevel} Certificate`,
          description: careerPath.levels[currentLevel - 1].title,
          careerPath: userProfile.careerPath,
          level: currentLevel,
          issuedAt: new Date().toISOString(),
          score: score
        };
        certificates.push(newCertificate);
        localStorage.setItem('pathpilot_certificates', JSON.stringify(certificates));
        
        toast({
          title: "🏅 Certificate earned!",
          description: `Certificate added to your profile for completing Level ${currentLevel}!`,
        });
      }

      updateProfile({
        ...userProfile,
        level: newLevel,
        points: newPoints,
        badges: newBadges
      });

      toast({
        title: "🎉 Level completed!",
        description: `You've earned 100 points and unlocked Level ${newLevel}!`,
      });
    } else {
      toast({
        title: "Keep trying!",
        description: "You need 70% to pass. Review the material and try again!",
        variant: "destructive",
      });
    }
    setShowQuiz(false);
  };

  const startQuiz = (level: number) => {
    setQuizLevel(level);
    setShowQuiz(true);
  };

  if (showQuiz) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 pt-20 pb-16 max-w-4xl">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setShowQuiz(false)}>
              ← Back to Roadmap
            </Button>
          </div>
          <QuizComponent
            careerPath={userProfile.careerPath}
            level={quizLevel}
            onComplete={handleQuizComplete}
          />
        </div>
      </MainLayout>
    );
  }

  const completedLevels = currentLevel - 1;
  const totalLevels = careerPath.levels.length;
  const progressPercentage = (completedLevels / totalLevels) * 100;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your {careerPath.title} Roadmap</h1>
          <p className="text-muted-foreground text-lg mb-6">
            Follow this structured path to advance your career step by step
          </p>
          
          <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Progress Overview</h3>
                  <p className="text-muted-foreground">Level {currentLevel} of {totalLevels}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
                  <p className="text-sm text-muted-foreground">Complete</p>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-3" />
              <div className="flex items-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>{userProfile.points || 0} points</span>
                </div>
                <div className="flex items-center gap-1">
                  <Target className="h-4 w-4 text-blue-500" />
                  <span>{completedLevels} levels completed</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {careerPath.levels.map((level, index) => {
            const levelNumber = index + 1;
            const isCompleted = levelNumber < currentLevel;
            const isCurrent = levelNumber === currentLevel;
            const isLocked = levelNumber > currentLevel;
            
            return (
              <Card 
                key={index} 
                className={`${
                  isCompleted 
                    ? 'border-green-500 bg-green-50/50 dark:bg-green-950/20' 
                    : isCurrent 
                    ? 'border-primary bg-primary/5' 
                    : 'opacity-60'
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        isCompleted 
                          ? 'bg-green-500 text-white' 
                          : isCurrent 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="h-6 w-6" />
                        ) : isLocked ? (
                          <Lock className="h-6 w-6" />
                        ) : (
                          <PlayCircle className="h-6 w-6" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-xl">Level {levelNumber}: {level.title}</CardTitle>
                        <CardDescription className="mt-1">
                          Duration: {level.duration || '3-4 months'}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={isCompleted ? "default" : isCurrent ? "secondary" : "outline"}>
                        {isCompleted ? "Completed" : isCurrent ? "Current" : "Locked"}
                      </Badge>
                      {isCompleted && (
                        <Award className="h-5 w-5 text-yellow-500" title="Certificate Available" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Courses & Learning Resources
                      </h4>
                      <div className="space-y-2">
                        {level.courses.map((course, courseIndex) => (
                          <div key={courseIndex} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                            <a 
                              href={course.link} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:text-blue-800 underline"
                            >
                              {course.name}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {level.projects && level.projects.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2">Recommended Projects</h4>
                        <div className="flex flex-wrap gap-2">
                          {level.projects.map((project, projectIndex) => (
                            <Badge key={projectIndex} variant="outline" className="text-xs">
                              {project}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Internship Opportunities</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {level.internships.slice(0, 2).map((internship, internIndex) => (
                            <li key={internIndex} className="flex items-center gap-2">
                              <div className="h-1 w-1 bg-primary rounded-full" />
                              <a 
                                href={internship} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                              >
                                View Opportunities
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-sm">Job Platforms</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {level.jobs.slice(0, 2).map((job, jobIndex) => (
                            <li key={jobIndex} className="flex items-center gap-2">
                              <div className="h-1 w-1 bg-primary rounded-full" />
                              <a 
                                href={job} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 underline"
                              >
                                Explore Jobs
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Master's Program Guidance</h4>
                      <p className="text-xs text-muted-foreground">{level.masters}</p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      {isCurrent && (
                        <Button onClick={() => startQuiz(levelNumber)}>
                          Take Level {levelNumber} Quiz
                        </Button>
                      )}
                      <Button variant="outline" size="sm" disabled={isLocked}>
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {currentLevel > totalLevels && (
          <Card className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200">
            <CardContent className="p-6 text-center">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
              <p className="text-muted-foreground">
                You've completed the entire {careerPath.title} roadmap! 
                Continue building your skills and exploring advanced topics.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default RoadmapPage;
