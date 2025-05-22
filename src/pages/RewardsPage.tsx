
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Star, Gift, Award, Zap, Target, Rocket } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const RewardsPage = () => {
  const { user } = useAuth();
  const profile = user?.profile;
  
  const currentLevel = profile?.level || 1;
  const points = profile?.points || 0;
  
  const badges = [
    { 
      id: 1, 
      name: "Fast Learner", 
      description: "Completed first course in record time",
      icon: <Zap className="h-8 w-8" />,
      color: "from-yellow-500 to-orange-500",
      earned: true,
      date: "Apr 10, 2025"
    },
    { 
      id: 2, 
      name: "Problem Solver", 
      description: "Solved 50 coding challenges successfully",
      icon: <Target className="h-8 w-8" />,
      color: "from-blue-500 to-indigo-500",
      earned: true,
      date: "Apr 22, 2025"
    },
    { 
      id: 3, 
      name: "Team Player", 
      description: "Contributed to 5 group projects",
      icon: <Trophy className="h-8 w-8" />,
      color: "from-green-500 to-emerald-500",
      earned: false
    },
    { 
      id: 4, 
      name: "Code Master", 
      description: "Achieved excellence in programming skills",
      icon: <Award className="h-8 w-8" />,
      color: "from-purple-500 to-pink-500",
      earned: false
    },
    { 
      id: 5, 
      name: "Early Adopter", 
      description: "Joined PathPilot in its first month",
      icon: <Rocket className="h-8 w-8" />,
      color: "from-red-500 to-rose-500",
      earned: true,
      date: "Mar 15, 2025"
    },
    { 
      id: 6, 
      name: "Perfect Attendance", 
      description: "Completed 30 consecutive days of learning",
      icon: <Star className="h-8 w-8" />,
      color: "from-amber-500 to-yellow-500",
      earned: false
    }
  ];
  
  const rewards = [
    { 
      id: 1, 
      name: "Premium Learning Materials", 
      pointsCost: 500,
      description: "Access to exclusive tutorials and resources",
      image: "/placeholder.svg",
      available: points >= 500
    },
    { 
      id: 2, 
      name: "1:1 Mentorship Session", 
      pointsCost: 1000,
      description: "30-minute session with an industry expert",
      image: "/placeholder.svg",
      available: points >= 1000
    },
    { 
      id: 3, 
      name: "Resume Review", 
      pointsCost: 750,
      description: "Professional review and feedback on your resume",
      image: "/placeholder.svg",
      available: points >= 750
    },
    { 
      id: 4, 
      name: "Mock Interview", 
      pointsCost: 1500,
      description: "Practice interview with feedback",
      image: "/placeholder.svg",
      available: points >= 1500
    }
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Rewards</h1>
          <p className="text-xl text-muted-foreground">
            Track your achievements and redeem rewards
          </p>
        </div>
        
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{currentLevel}</p>
                  <p className="text-sm text-muted-foreground">{5 - currentLevel} levels to go</p>
                </div>
                <Trophy className="h-12 w-12 text-primary" />
              </div>
              <Progress value={(currentLevel / 5) * 100} className="h-2 mt-4" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Achievement Points</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{points}</p>
                  <p className="text-sm text-muted-foreground">Keep earning!</p>
                </div>
                <Star className="h-12 w-12 text-accent" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-secondary/20 to-secondary/10 border-secondary/30">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Badges Earned</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-bold">{badges.filter(b => b.earned).length}</p>
                  <p className="text-sm text-muted-foreground">Out of {badges.length} total</p>
                </div>
                <Gift className="h-12 w-12 text-secondary-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Badges */}
        <h2 className="text-2xl font-semibold mb-4">Your Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {badges.map((badge) => (
            <Card 
              key={badge.id} 
              className={`text-center hover:shadow-lg transition-shadow ${!badge.earned && 'opacity-50 grayscale'}`}
            >
              <CardContent className="pt-6 pb-4 px-4">
                <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center mb-3`}>
                  {badge.icon}
                </div>
                <h3 className="font-semibold mb-1 line-clamp-1">{badge.name}</h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {badge.description}
                </p>
                {badge.earned ? (
                  <Badge variant="outline" className="mx-auto text-xs bg-green-500/10">
                    Earned {badge.date}
                  </Badge>
                ) : (
                  <Badge variant="outline" className="mx-auto text-xs">
                    Locked
                  </Badge>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Redeemable Rewards */}
        <h2 className="text-2xl font-semibold mb-4">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewards.map((reward) => (
            <Card key={reward.id} className={!reward.available ? 'opacity-70' : ''}>
              <div className="aspect-video bg-muted flex items-center justify-center">
                <img src={reward.image} alt={reward.name} className="max-h-full" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{reward.name}</span>
                  <Badge className="ml-2">
                    <Star className="h-3.5 w-3.5 mr-1 fill-current" /> {reward.pointsCost}
                  </Badge>
                </CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <button 
                  className={`w-full py-2 rounded-md text-center ${
                    reward.available 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  disabled={!reward.available}
                >
                  {reward.available ? 'Redeem Reward' : `Need ${reward.pointsCost - points} more points`}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default RewardsPage;
