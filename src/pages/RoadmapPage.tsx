
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, GraduationCap, Briefcase, School, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../hooks/useAuth';
import { careerPaths } from '../data/careerPaths';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RoadmapPage = () => {
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

  const careerPath = careerPaths[profile.careerPath];
  const currentLevel = profile.level || 1;
  
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

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold">Your Career Roadmap</h1>
            <p className="text-muted-foreground text-lg mb-2">
              Your path to becoming a {profile.careerPath}
            </p>
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="outline" className="bg-primary/10 text-primary">
                {careerPath.salaryRange}
              </Badge>
              <Badge variant="outline" className="bg-secondary/10">
                Current Level: {currentLevel}
              </Badge>
            </div>
          </div>
          
          <div className="w-full md:w-64 mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground mb-2">Overall Progress</p>
            <Progress value={(currentLevel / 5) * 100} className="h-2 mb-2" />
            <p className="text-xs text-right">{currentLevel}/5 Levels Completed</p>
          </div>
        </div>
        
        {/* Career Skills */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Required Skills</CardTitle>
            <CardDescription>
              Key skills for a successful {profile.careerPath} career
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {careerPath.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Career Description */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Career Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{careerPath.description}</p>
          </CardContent>
        </Card>
        
        {/* Level-based Roadmap */}
        <h2 className="text-2xl font-bold mb-4">Level-by-Level Roadmap</h2>
        
        {careerPath.levels.map((level, index) => {
          const levelNumber = index + 1;
          const isCurrentLevel = levelNumber === currentLevel;
          const isCompleted = levelNumber < currentLevel;
          const isLocked = levelNumber > currentLevel;
          
          return (
            <Card 
              key={index} 
              className={`mb-6 ${isCurrentLevel ? 'border-primary' : isCompleted ? 'border-green-500' : ''}`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      isCompleted ? 'bg-green-500 text-white' : isCurrentLevel ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {levelNumber}
                    </div>
                    <CardTitle className="flex items-center gap-2">
                      {level.title}
                      {isCurrentLevel && <Badge variant="outline" className="bg-primary/20">Current</Badge>}
                      {isCompleted && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {isLocked && <Badge variant="outline" className="bg-secondary/20">Locked</Badge>}
                    </CardTitle>
                  </div>
                  <Badge variant="outline">{level.duration || '2-3 months'}</Badge>
                </div>
                <CardDescription>
                  Complete these resources to advance to the next level
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="courses">
                  <TabsList className="mb-4">
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="projects">Projects</TabsTrigger>
                    <TabsTrigger value="career">Career</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="courses" className="space-y-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      Recommended Courses
                    </h3>
                    
                    <div className="space-y-3">
                      {level.courses.map((course, idx) => (
                        <Card key={idx} className="bg-secondary/20">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <p className="font-medium">{course.name}</p>
                              <a 
                                href={course.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-primary hover:underline flex items-center gap-1"
                              >
                                <span>Open</span>
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="pt-2">
                      <Button disabled={isLocked} className="w-full">
                        {isCompleted ? 'Revisit Courses' : 'Start Learning'}
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="projects" className="space-y-4">
                    <h3 className="font-semibold">Hands-on Projects</h3>
                    
                    <div className="space-y-3">
                      {level.projects ? level.projects.map((project, idx) => (
                        <Card key={idx} className="bg-secondary/20">
                          <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                              <p>{project}</p>
                              <Badge variant={isCompleted ? "outline" : "secondary"}>
                                {isCompleted ? 'Completed' : 'Pending'}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      )) : (
                        <p className="text-muted-foreground">No projects specified for this level.</p>
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="career" className="space-y-6">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2 mb-3">
                        <Briefcase className="h-5 w-5" />
                        Internship Opportunities
                      </h3>
                      <div className="space-y-2">
                        {level.internships.map((link, idx) => (
                          <a 
                            key={idx}
                            href={link}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block p-3 bg-secondary/20 rounded-md hover:bg-secondary/30 text-primary flex items-center justify-between"
                          >
                            <span>{new URL(link).hostname.replace('www.', '')}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold flex items-center gap-2 mb-3">
                        <Briefcase className="h-5 w-5" />
                        Job Portals
                      </h3>
                      <div className="space-y-2">
                        {level.jobs.map((link, idx) => (
                          <a 
                            key={idx}
                            href={link}
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="block p-3 bg-secondary/20 rounded-md hover:bg-secondary/30 text-primary flex items-center justify-between"
                          >
                            <span>{new URL(link).hostname.replace('www.', '')}</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold flex items-center gap-2 mb-3">
                        <School className="h-5 w-5" />
                        Higher Education
                      </h3>
                      <div className="p-3 bg-secondary/20 rounded-md">
                        <p className="text-sm">{level.masters}</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </MainLayout>
  );
};

export default RoadmapPage;
