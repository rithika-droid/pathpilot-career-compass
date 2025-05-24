
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Lock, PlayCircle, Trophy, Target, BookOpen } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { careerPaths } from '../data/careerPaths';
import { useNavigate } from 'react-router-dom';
import QuizComponent from '../components/Quiz/QuizComponent';
import { useState } from 'react';

const RoadmapPage = () => {
  const { userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizLevel, setQuizLevel] = useState(1);
  
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
      
      updateProfile({
        ...userProfile,
        level: newLevel,
        points: newPoints
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
                          {level.description || `Master the fundamentals of ${level.title.toLowerCase()}`}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={isCompleted ? "default" : isCurrent ? "secondary" : "outline"}>
                      {isCompleted ? "Completed" : isCurrent ? "Current" : "Locked"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        Skills You'll Learn
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {level.skills.map((skill, skillIndex) => (
                          <Badge key={skillIndex} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Key Topics</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {level.topics.slice(0, 3).map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center gap-2">
                            <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                            {topic}
                          </li>
                        ))}
                        {level.topics.length > 3 && (
                          <li className="text-xs italic">
                            +{level.topics.length - 3} more topics
                          </li>
                        )}
                      </ul>
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
