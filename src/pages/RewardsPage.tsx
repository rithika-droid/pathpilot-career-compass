
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Gift, Award, ChevronUp, Target } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const RewardsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const profile = user?.profile;
  
  if (!profile?.careerPath) {
    return (
      <MainLayout>
        <div className="container pt-20 px-4 flex flex-col items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>
                Please complete your profile to view your rewards.
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
  
  const currentLevel = profile.level || 1;
  const points = profile.points || 0;
  
  // Points needed for next level
  const pointsForNextLevel = currentLevel * 1000;
  const progressToNextLevel = (points / pointsForNextLevel) * 100;
  
  // Define badges
  const badges = [
    {
      id: "starter",
      name: "Career Starter",
      icon: <Target className="h-5 w-5" />,
      description: "Started your career journey",
      color: "from-blue-500 to-cyan-500",
      unlocked: true
    },
    {
      id: "level1",
      name: "Level 1 Master",
      icon: <ChevronUp className="h-5 w-5" />,
      description: "Completed all Level 1 courses",
      color: "from-green-500 to-emerald-500",
      unlocked: currentLevel > 1
    },
    {
      id: "level2",
      name: "Level 2 Master",
      icon: <ChevronUp className="h-5 w-5" />,
      description: "Completed all Level 2 courses",
      color: "from-purple-500 to-pink-500",
      unlocked: currentLevel > 2
    },
    {
      id: "level3",
      name: "Level 3 Master",
      icon: <ChevronUp className="h-5 w-5" />,
      description: "Completed all Level 3 courses",
      color: "from-orange-500 to-red-500",
      unlocked: currentLevel > 3
    },
    {
      id: "level4",
      name: "Level 4 Master",
      icon: <ChevronUp className="h-5 w-5" />,
      description: "Completed all Level 4 courses",
      color: "from-indigo-500 to-blue-500",
      unlocked: currentLevel > 4
    },
    {
      id: "level5",
      name: "Career Champion",
      icon: <Trophy className="h-5 w-5" />,
      description: "Completed the full career path",
      color: "from-yellow-500 to-amber-500",
      unlocked: currentLevel > 5
    }
  ];
  
  const unlockedBadges = badges.filter(badge => badge.unlocked);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-16">
        <h1 className="text-3xl font-bold mb-2">Your Rewards</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Track your achievements and progress milestones
        </p>
        
        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Trophy className="h-5 w-5 text-primary mr-2" />
                Career Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{currentLevel}</span>
                <span className="text-sm ml-2 text-muted-foreground">/ 5</span>
              </div>
              <Progress value={(currentLevel / 5) * 100} className="h-2 mt-2" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Star className="h-5 w-5 text-green-500 mr-2" />
                Points
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{points}</span>
                <span className="text-sm ml-2 text-muted-foreground">pts</span>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                <span>Next level: {pointsForNextLevel} pts</span>
                <span>{Math.round(progressToNextLevel)}%</span>
              </div>
              <Progress value={progressToNextLevel} className="h-2 mt-1" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Award className="h-5 w-5 text-purple-500 mr-2" />
                Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{unlockedBadges.length}</span>
                <span className="text-sm ml-2 text-muted-foreground">/ {badges.length}</span>
              </div>
              <Progress 
                value={(unlockedBadges.length / badges.length) * 100} 
                className="h-2 mt-2" 
              />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Gift className="h-5 w-5 text-amber-500 mr-2" />
                Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold">{currentLevel}</span>
                <span className="text-sm ml-2 text-muted-foreground">certificates</span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => navigate('/certificates')} 
                className="w-full mt-2 bg-card/50"
              >
                View Certificates
              </Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Badges */}
        <Card className="mb-10">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Your Badges
            </CardTitle>
            <CardDescription>
              Badges showcase your skills and achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {badges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center">
                  <div 
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 
                    ${badge.unlocked 
                      ? `bg-gradient-to-r ${badge.color}` 
                      : 'bg-secondary/50'
                    }
                    ${!badge.unlocked && 'opacity-40'}`}
                  >
                    {badge.icon}
                  </div>
                  <p className="text-sm font-medium text-center">{badge.name}</p>
                  <p className="text-xs text-muted-foreground text-center">
                    {badge.unlocked ? badge.description : 'Locked'}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Progress Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="h-5 w-5 mr-2" />
              Progress Timeline
            </CardTitle>
            <CardDescription>
              Your journey from beginner to expert
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 relative">
              <div className="absolute left-[15px] top-6 bottom-6 w-[2px] bg-border"></div>
              
              {[1, 2, 3, 4, 5].map((level) => {
                const isCompleted = currentLevel > level;
                const isCurrent = currentLevel === level;
                
                return (
                  <div key={level} className="flex gap-4 items-start">
                    <div 
                      className={`w-8 h-8 rounded-full z-10 flex items-center justify-center text-sm font-bold
                      ${isCompleted 
                        ? 'bg-green-500 text-white' 
                        : isCurrent 
                        ? 'bg-primary text-white' 
                        : 'bg-secondary text-muted-foreground'}`}
                    >
                      {level}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold flex items-center gap-2">
                        Level {level}
                        {isCurrent && <Badge className="bg-primary/20 text-primary">Current</Badge>}
                        {isCompleted && <Badge variant="outline" className="bg-green-500/10 text-green-500">Completed</Badge>}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {isCompleted 
                          ? `Completed on ${new Date().toLocaleDateString()}` 
                          : isCurrent 
                          ? 'In progress' 
                          : 'Not started yet'}
                      </p>
                      
                      {isCompleted && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">+500 points</Badge>
                          <Badge variant="outline" className="bg-purple-500/10 text-purple-500">Badge Unlocked</Badge>
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Certificate Earned</Badge>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/roadmap')}
            >
              View Full Roadmap
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RewardsPage;
