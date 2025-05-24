
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Target, Award, Gift } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const RewardsPage = () => {
  const { userProfile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);
  
  const currentLevel = userProfile?.level || 1;
  const currentPoints = userProfile?.points || 0;
  const badges = userProfile?.badges || [];

  useEffect(() => {
    // Load claimed rewards from localStorage
    const savedClaimed = JSON.parse(localStorage.getItem('pathpilot_claimed_rewards') || '[]');
    setClaimedRewards(savedClaimed);
  }, []);

  // Sample reward data
  const achievements = [
    { id: 1, title: "First Steps", description: "Complete your first lesson", icon: Target, earned: true, points: 50 },
    { id: 2, title: "Quick Learner", description: "Complete 5 lessons in a day", icon: Star, earned: currentLevel >= 2, points: 100 },
    { id: 3, title: "Consistent", description: "Study for 7 days straight", icon: Trophy, earned: currentLevel >= 3, points: 200 },
    { id: 4, title: "Level Master", description: "Complete a full level", icon: Award, earned: currentLevel >= 2, points: 500 }
  ];

  const rewards = [
    { 
      id: 'premium_cert', 
      title: "Certificate Template", 
      description: "Unlock premium certificate designs", 
      cost: 500, 
      unlocked: currentPoints >= 500,
      claimed: claimedRewards.includes('premium_cert')
    },
    { 
      id: 'priority_support', 
      title: "Priority Support", 
      description: "Get faster help from mentors", 
      cost: 1000, 
      unlocked: currentPoints >= 1000,
      claimed: claimedRewards.includes('priority_support')
    },
    { 
      id: 'career_consultation', 
      title: "Career Consultation", 
      description: "1-on-1 session with career expert", 
      cost: 2000, 
      unlocked: currentPoints >= 2000,
      claimed: claimedRewards.includes('career_consultation')
    }
  ];

  const handleClaimReward = (reward: typeof rewards[0]) => {
    if (!reward.unlocked || reward.claimed || currentPoints < reward.cost) {
      return;
    }

    // Deduct points and mark as claimed
    const newPoints = currentPoints - reward.cost;
    const newClaimedRewards = [...claimedRewards, reward.id];
    
    if (userProfile) {
      updateProfile({
        ...userProfile,
        points: newPoints
      });
    }
    
    // Save to localStorage
    setClaimedRewards(newClaimedRewards);
    localStorage.setItem('pathpilot_claimed_rewards', JSON.stringify(newClaimedRewards));
    
    toast({
      title: "🎁 Reward claimed successfully!",
      description: `You've claimed "${reward.title}" for ${reward.cost} points!`,
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Rewards & Achievements</h1>
            <p className="text-muted-foreground">Track your progress and unlock exclusive rewards</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <Badge variant="outline" className="bg-primary/10 text-primary text-lg px-4 py-2">
              <Trophy className="h-4 w-4 mr-2" />
              {currentPoints} Points
            </Badge>
            <Badge variant="outline" className="bg-secondary/50 text-lg px-4 py-2">
              Level {currentLevel}
            </Badge>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement) => {
              const IconComponent = achievement.icon;
              return (
                <Card key={achievement.id} className={`${achievement.earned ? 'border-primary bg-primary/5' : 'opacity-60'}`}>
                  <CardHeader className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                      achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{achievement.title}</CardTitle>
                    <CardDescription>{achievement.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <Badge variant={achievement.earned ? "default" : "secondary"}>
                      {achievement.earned ? `+${achievement.points} points` : 'Locked'}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Rewards Store */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Rewards Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`${reward.claimed ? 'border-green-500 bg-green-50/30 dark:bg-green-950/20' : reward.unlocked ? 'border-primary' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Gift className={`h-8 w-8 ${
                      reward.claimed ? 'text-green-500' : 
                      reward.unlocked ? 'text-primary' : 'text-muted-foreground'
                    }`} />
                    <Badge variant={reward.claimed ? "default" : reward.unlocked ? "secondary" : "outline"}>
                      {reward.cost} points
                    </Badge>
                  </div>
                  <CardTitle>{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    {reward.claimed ? (
                      <Badge variant="outline" className="bg-green-500/10 text-green-600">
                        ✓ Claimed
                      </Badge>
                    ) : reward.unlocked ? (
                      <Button 
                        onClick={() => handleClaimReward(reward)}
                        className="w-full"
                      >
                        Claim Reward
                      </Button>
                    ) : (
                      <Badge variant="secondary">
                        Need {reward.cost - currentPoints} more points
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Keep learning to unlock more rewards!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Current Level</span>
                <span className="text-sm text-muted-foreground">Level {currentLevel}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Points</span>
                <span className="text-sm text-muted-foreground">{currentPoints}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Achievements Earned</span>
                <span className="text-sm text-muted-foreground">
                  {achievements.filter(a => a.earned).length}/{achievements.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Rewards Claimed</span>
                <span className="text-sm text-muted-foreground">
                  {claimedRewards.length}/{rewards.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default RewardsPage;
