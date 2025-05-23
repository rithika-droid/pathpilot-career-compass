import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { useAuth } from '../hooks/useAuth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Search, Filter, CheckCircle, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { careerPaths } from '../data/careerPaths';
import { useNavigate, useLocation } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/sonner';

const CoursesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profile = user?.profile;
  
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  
  // Check if we have a specific level to filter by from navigation state
  useEffect(() => {
    if (location.state && location.state.level) {
      setLevelFilter(location.state.level.toString());
    }
  }, [location.state]);
  
  if (!profile?.careerPath) {
    return (
      <MainLayout>
        <div className="container pt-20 px-4 flex flex-col items-center justify-center min-h-screen">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>
                Please complete your profile to view courses.
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

  const careerPath = careerPaths[profile.careerPath];
  const currentLevel = profile.level || 1;
  
  if (!careerPath) {
    return (
      <MainLayout>
        <div className="container pt-20 px-4">
          <h1 className="text-3xl font-bold mb-4">Course Library</h1>
          <p>Career path information not available.</p>
        </div>
      </MainLayout>
    );
  }

  // Collect all courses from all levels
  const allCourses = careerPath.levels.flatMap((level, levelIndex) => 
    level.courses.map(course => ({
      ...course,
      levelNumber: levelIndex + 1,
      levelTitle: level.title,
      isCompleted: levelIndex + 1 < currentLevel,
      isCurrentLevel: levelIndex + 1 === currentLevel
    }))
  );
  
  // Apply filters
  let filteredCourses = allCourses;
  
  // Apply level filter
  if (levelFilter !== 'all') {
    filteredCourses = filteredCourses.filter(
      course => course.levelNumber === parseInt(levelFilter)
    );
  }
  
  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filteredCourses = filteredCourses.filter(
      course => course.name.toLowerCase().includes(term)
    );
  }

  // Add function to mark course as completed
  const markCourseCompleted = (courseId: string) => {
    if (user && user.profile) {
      // In a real application, this would be a backend call to update the user's profile
      // For now, let's just simulate with a toast notification
      toast.success("Course marked as completed!");
      
      // Here you would update the completedCourses array in the user profile
      // This is a placeholder for the actual implementation
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Course Library</h1>
            <p className="text-muted-foreground">
              Explore courses for your {profile.careerPath} career path
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary">
              Level {currentLevel}
            </Badge>
            <Badge variant="outline">
              {filteredCourses.filter(c => c.isCompleted).length}/{allCourses.length} Completed
            </Badge>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="w-full md:w-48">
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by level" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {careerPath.levels.map((_, index) => (
                  <SelectItem key={index} value={(index + 1).toString()}>
                    Level {index + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Progress Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {careerPath.levels.map((level, index) => {
                const levelNumber = index + 1;
                const isCompleted = levelNumber < currentLevel;
                const isActive = levelNumber === currentLevel;
                const coursesCount = level.courses.length;
                const completedCount = isCompleted ? coursesCount : 0;
                const progress = (completedCount / coursesCount) * 100;
                
                return (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                        }`}>
                          {levelNumber}
                        </span>
                        <span className="text-sm font-medium">
                          {level.title}
                          {isActive && <Badge variant="outline" className="ml-2 bg-primary/10 text-primary text-xs">Current</Badge>}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{completedCount}/{coursesCount}</span>
                    </div>
                    <Progress value={progress} className="h-1" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
        
        {/* Course Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <Card key={index} className={`overflow-hidden ${course.isCompleted ? 'border-green-500/40' : course.isCurrentLevel ? 'border-primary/40' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="outline" className={course.isCompleted ? 'bg-green-500/10 text-green-500' : course.isCurrentLevel ? 'bg-primary/10 text-primary' : 'bg-secondary/50'}>
                        Level {course.levelNumber}
                      </Badge>
                      <CardTitle className="mt-2 text-lg line-clamp-2">{course.name}</CardTitle>
                    </div>
                    {course.isCompleted && (
                      <CheckCircle className="h-5 w-5 text-green-500 shrink-0" />
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pb-3">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>Est. 4-6 hours</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.levelTitle}
                  </p>
                </CardContent>
                
                <CardFooter className="pt-0 flex flex-col gap-2">
                  <a 
                    href={course.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full"
                  >
                    <Button variant={course.isCompleted ? "outline" : "default"} className="w-full">
                      {course.isCompleted ? 'Review Course' : 'Start Course'}
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </a>
                  
                  {!course.isCompleted && course.isCurrentLevel && (
                    <Button 
                      variant="outline" 
                      className="w-full border-green-500 text-green-500 hover:bg-green-500/10" 
                      onClick={() => markCourseCompleted(course.name)}
                    >
                      Mark as Complete
                      <CheckCircle className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No courses found matching your filters.</p>
              <Button onClick={() => { setSearchTerm(''); setLevelFilter('all'); }} variant="outline" className="mt-4">
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CoursesPage;
