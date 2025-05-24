
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, Target, TrendingUp, Clock, Star } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data for demonstration
  const mockStats = {
    coursesCompleted: 3,
    totalCourses: 12,
    certificates: 2,
    points: 1250,
    streak: 7,
    nextMilestone: 'Complete 5 courses'
  };

  const mockRecentActivity = [
    { id: 1, type: 'course', title: 'JavaScript Fundamentals', status: 'completed', date: '2 days ago' },
    { id: 2, type: 'certificate', title: 'Web Development Certificate', status: 'earned', date: '1 week ago' },
    { id: 3, type: 'course', title: 'React Basics', status: 'in-progress', date: '3 days ago' }
  ];

  const mockUpcomingDeadlines = [
    { id: 1, title: 'React Advanced Course', dueDate: '3 days', priority: 'high' },
    { id: 2, title: 'TypeScript Fundamentals', dueDate: '1 week', priority: 'medium' },
    { id: 3, title: 'Node.js Basics', dueDate: '2 weeks', priority: 'low' }
  ];

  const progressPercentage = (mockStats.coursesCompleted / mockStats.totalCourses) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 pt-20 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome back, {user?.email?.split('@')[0] || 'Explorer'}! 🚀
          </h1>
          <p className="text-lg text-muted-foreground">
            Continue your learning journey and achieve your career goals
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.coursesCompleted}</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Trophy className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.certificates}</div>
              <p className="text-xs text-muted-foreground">
                +1 this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Points Earned</CardTitle>
              <Star className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.points}</div>
              <p className="text-xs text-muted-foreground">
                +150 this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockStats.streak} days</div>
              <p className="text-xs text-muted-foreground">
                Keep it up! 🔥
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Overall Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Course Completion</span>
                  <span>{mockStats.coursesCompleted}/{mockStats.totalCourses} courses</span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
                <p className="text-sm text-muted-foreground">
                  {Math.round(progressPercentage)}% complete
                </p>
              </div>
              
              <div className="pt-4 border-t">
                <h4 className="font-medium mb-2">Next Milestone</h4>
                <p className="text-sm text-muted-foreground">{mockStats.nextMilestone}</p>
                <Button className="mt-2" size="sm">
                  View Roadmap
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Upcoming Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockUpcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground">Due in {deadline.dueDate}</p>
                  </div>
                  <Badge 
                    variant={deadline.priority === 'high' ? 'destructive' : deadline.priority === 'medium' ? 'default' : 'secondary'}
                  >
                    {deadline.priority}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-3">
                    {activity.type === 'course' ? (
                      <BookOpen className="h-5 w-5 text-primary" />
                    ) : (
                      <Trophy className="h-5 w-5 text-accent" />
                    )}
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={activity.status === 'completed' || activity.status === 'earned' ? 'default' : 'secondary'}
                  >
                    {activity.status.replace('-', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <BookOpen className="h-6 w-6" />
                <span>Browse Courses</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Target className="h-6 w-6" />
                <span>View Roadmap</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Trophy className="h-6 w-6" />
                <span>Check Rewards</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
