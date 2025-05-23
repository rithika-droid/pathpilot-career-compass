
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '../../hooks/useAuth';
import { BookOpen, Trophy, Calendar, Play, Target, Star } from 'lucide-react';
import { getCareerRoadmap } from '../../utils/careerAlgorithm';
import MainLayout from '../Layout/MainLayout';
import ProfileEditor from '../Profile/ProfileEditor';
import ContactInfo from '../Contact/ContactInfo';
import CompletedCoursesSection from '../Courses/CompletedCoursesSection';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../../hooks/use-mobile';

interface RoadmapLevel {
  title: string;
  duration: string;
  courses: string[];
}

interface Roadmap {
  [key: string]: RoadmapLevel;
}

const DashboardSkeleton = () => (
  <MainLayout>
    <div className="container mx-auto px-4 pt-20 pb-10">
      <div className="mb-8">
        <Skeleton className="h-10 w-96 mb-2" />
        <Skeleton className="h-6 w-80" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-12" />
                </div>
                <Skeleton className="h-8 w-8 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-36" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-32 w-full" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </MainLayout>
);

const Dashboard = () => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  
  // Show skeleton while loading
  if (loading) {
    return <DashboardSkeleton />;
  }

  // If no user profile, show a simplified dashboard with profile setup
  if (!userProfile?.careerPath) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 pt-20 pb-10">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Welcome, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}! 👋
            </h1>
            <p className="text-xl text-muted-foreground">
              Let's get you started on your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
                <CardDescription>
                  Set up your profile to get personalized course recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/profile-setup')} className="w-full">
                  Set Up Profile
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Explore Courses</CardTitle>
                <CardDescription>
                  Browse available courses and start learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" onClick={() => navigate('/courses')} className="w-full">
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CompletedCoursesSection />
            <ProfileEditor />
          </div>
        </div>
      </MainLayout>
    );
  }

  const roadmap = getCareerRoadmap(userProfile.careerPath) as Roadmap;
  const currentLevel = userProfile.level || 1;
  const points = userProfile.points || 0;
  const badges = userProfile.badges || [];

  const progressPercentage = (currentLevel / 5) * 100;
  
  const handleContinueLearning = () => {
    navigate('/courses', { state: { level: currentLevel } });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}! 👋
          </h1>
          <p className="text-xl text-muted-foreground">
            Continue your journey as a <span className="text-primary font-semibold">{userProfile.careerPath}</span>
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/20 border-blue-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-600">Current Level</p>
                  <p className="text-3xl font-bold">{currentLevel}</p>
                </div>
                <Target className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/20 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-600">Points Earned</p>
                  <p className="text-3xl font-bold">{points}</p>
                </div>
                <Star className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/20 border-purple-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-600">Badges</p>
                  <p className="text-3xl font-bold">{badges.length}</p>
                </div>
                <Trophy className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/20 border-orange-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-600">Progress</p>
                  <p className="text-3xl font-bold">{Math.round(progressPercentage)}%</p>
                </div>
                <BookOpen className="h-8 w-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Continue Learning Card */}
          <Card className="lg:col-span-2 bg-gradient-to-br from-primary/5 to-accent/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5" />
                Continue Your Course
              </CardTitle>
              <CardDescription>
                Level {currentLevel}: {roadmap[`level${currentLevel}` as keyof typeof roadmap]?.title || 'Getting Started'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Level Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <h4 className="font-semibold">Current Courses:</h4>
                  <div className="max-h-24 overflow-y-auto pr-1">
                    {roadmap[`level${currentLevel}` as keyof typeof roadmap]?.courses.map((course, index) => (
                      <div key={index} className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{course}</span>
                      </div>
                    )) || (
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">Introduction to Programming</span>
                      </div>
                    )}
                  </div>
                </div>

                <Button className="w-full" onClick={handleContinueLearning}>
                  Continue Learning
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                  <span className="text-sm">Mon: Practice Problems</span>
                  <Badge variant="outline">2h</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                  <span className="text-sm">Wed: Video Lectures</span>
                  <Badge variant="outline">1.5h</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                  <span className="text-sm">Fri: Project Work</span>
                  <Badge variant="outline">3h</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-secondary/50 rounded">
                  <span className="text-sm">Sun: Review & Test</span>
                  <Badge variant="outline">1h</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completed Courses and Profile Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CompletedCoursesSection />
          <ProfileEditor />
        </div>

        {/* Contact and Roadmap Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <ContactInfo />
          
          {/* Roadmap Preview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Your Learning Roadmap</CardTitle>
              <CardDescription>
                Complete journey to become a {userProfile.careerPath}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-6">
              <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-5'} gap-4`}>
                {Object.entries(roadmap).map(([key, level], index) => {
                  const levelNum = index + 1;
                  const isCompleted = levelNum < currentLevel;
                  const isCurrent = levelNum === currentLevel;
                  
                  return (
                    <div
                      key={key}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                        isCompleted
                          ? 'bg-green-500/10 border-green-500/30'
                          : isCurrent
                          ? 'bg-primary/10 border-primary/30 ring-2 ring-primary/20'
                          : 'bg-secondary/30 border-border'
                      }`}
                      onClick={() => navigate('/roadmap', { state: { level: levelNum } })}
                    >
                      <div className="text-center">
                        <div
                          className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center text-sm font-bold ${
                            isCompleted
                              ? 'bg-green-500 text-white'
                              : isCurrent
                              ? 'bg-primary text-white'
                              : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          {levelNum}
                        </div>
                        <h4 className="font-semibold text-sm">{level.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{level.duration}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
