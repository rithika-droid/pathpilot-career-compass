
import React, { useState } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, Lock, BookOpen, Trophy, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { careerPaths } from '../data/careerPaths';
import { useNavigate } from 'react-router-dom';
import QuizComponent from '../components/Quiz/QuizComponent';

const RoadmapPage = () => {
  const { userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  
  if (!userProfile?.careerPath) {
    return (
      <MainLayout>
        <div className="container pt-20 px-4 flex flex-col items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>
                Please complete your profile to view your learning roadmap.
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
          <h1 className="text-3xl font-bold mb-4">Learning Roadmap</h1>
          <p>Career path information not available.</p>
        </div>
      </MainLayout>
    );
  }

  const handleQuizComplete = (passed: boolean, score: number) => {
    if (passed && selectedLevel === currentLevel) {
      // Update user level
      const newLevel = currentLevel + 1;
      const newPoints = (userProfile.points || 0) + 100;
      updateProfile({
        ...userProfile,
        level: newLevel,
        points: newPoints
      });
    }
    setShowQuiz(false);
    setSelectedLevel(null);
  };

  const handleLevelClick = (levelNumber: number) => {
    setSelectedLevel(levelNumber);
  };

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  if (showQuiz && selectedLevel) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 pt-20 pb-16 max-w-4xl">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setShowQuiz(false)}>
              ← Back to Roadmap
            </Button>
          </div>
          <QuizComponent
            level={selectedLevel}
            careerPath={userProfile.careerPath}
            onComplete={handleQuizComplete}
          />
        </div>
      </MainLayout>
    );
  }

  if (selectedLevel) {
    const levelData = careerPath.levels[selectedLevel - 1];
    const isCompleted = selectedLevel < currentLevel;
    const isCurrentLevel = selectedLevel === currentLevel;
    const isLocked = selectedLevel > currentLevel;

    return (
      <MainLayout>
        <div className="container mx-auto px-4 pt-20 pb-16">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedLevel(null)}>
              ← Back to Roadmap
            </Button>
          </div>
          
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Level {selectedLevel}: {levelData.title}</CardTitle>
                  <CardDescription className="text-lg mt-2">
                    {levelData.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  {isCompleted && <CheckCircle className="h-8 w-8 text-green-500" />}
                  {isCurrentLevel && <Circle className="h-8 w-8 text-primary" />}
                  {isLocked && <Lock className="h-8 w-8 text-muted-foreground" />}
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{levelData.courses.length} Courses</p>
                    <p className="text-sm text-muted-foreground">Interactive lessons</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Certificate</p>
                    <p className="text-sm text-muted-foreground">Upon completion</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">Community</p>
                    <p className="text-sm text-muted-foreground">Peer support</p>
                  </div>
                </div>
              </div>

              {isCurrentLevel && (
                <div className="bg-primary/10 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-primary mb-2">Ready to test your knowledge?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Complete the quiz to advance to the next level and earn your certificate.
                  </p>
                  <Button onClick={handleStartQuiz}>
                    Start Level {selectedLevel} Quiz
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Courses in This Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {levelData.courses.map((course, index) => (
                  <Card key={index} className="border-l-4 border-l-primary">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline">Course {index + 1}</Badge>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigate('/courses', { state: { level: selectedLevel } })}
                        >
                          View Course
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  // Main roadmap view
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Learning Roadmap</h1>
            <p className="text-muted-foreground text-lg">
              {userProfile.careerPath} Career Path
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <Badge variant="outline" className="bg-primary/10 text-primary text-lg px-4 py-2">
              Level {currentLevel} of {careerPath.levels.length}
            </Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPath.levels.map((level, index) => {
            const levelNumber = index + 1;
            const isCompleted = levelNumber < currentLevel;
            const isCurrentLevel = levelNumber === currentLevel;
            const isLocked = levelNumber > currentLevel;
            
            return (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  isCompleted ? 'border-green-500 bg-green-50/50' : 
                  isCurrentLevel ? 'border-primary bg-primary/5' : 
                  isLocked ? 'opacity-60' : ''
                }`}
                onClick={() => !isLocked && handleLevelClick(levelNumber)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        isCompleted ? 'bg-green-500 text-white' : 
                        isCurrentLevel ? 'bg-primary text-primary-foreground' : 
                        'bg-muted text-muted-foreground'
                      }`}>
                        {levelNumber}
                      </div>
                      <div>
                        <CardTitle className="text-lg">Level {levelNumber}</CardTitle>
                        <CardDescription>{level.title}</CardDescription>
                      </div>
                    </div>
                    
                    {isCompleted && <CheckCircle className="h-6 w-6 text-green-500" />}
                    {isCurrentLevel && <Circle className="h-6 w-6 text-primary fill-current" />}
                    {isLocked && <Lock className="h-6 w-6 text-muted-foreground" />}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {level.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {level.courses.length} courses
                    </span>
                    
                    {isCurrentLevel && (
                      <Badge className="bg-primary text-primary-foreground">
                        In Progress
                      </Badge>
                    )}
                    {isCompleted && (
                      <Badge className="bg-green-500 text-white">
                        Completed
                      </Badge>
                    )}
                    {isLocked && (
                      <Badge variant="secondary">
                        Locked
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </MainLayout>
  );
};

export default RoadmapPage;
