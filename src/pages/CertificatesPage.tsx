
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Award, Info, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { careerPaths } from '../data/careerPaths';
import { useNavigate } from 'react-router-dom';

const CertificatesPage = () => {
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
                Please complete your profile to view your certificates.
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
  const careerPath = careerPaths[profile.careerPath];
  
  if (!careerPath) {
    return (
      <MainLayout>
        <div className="container pt-20 px-4">
          <h1 className="text-3xl font-bold mb-4">Your Certificates</h1>
          <p>Career path information not available.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-16">
        <h1 className="text-3xl font-bold mb-2">Your Certificates</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Track your progress and showcase your achievements
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPath.levels.map((level, index) => {
            const levelNumber = index + 1;
            const isCompleted = levelNumber < currentLevel;
            const isLocked = levelNumber > currentLevel;
            
            return (
              <Card 
                key={index} 
                className={`${isLocked ? 'opacity-60' : isCompleted ? 'border-green-500' : ''}`}
              >
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4">
                    <Award className={`h-8 w-8 ${isCompleted ? 'text-green-500' : isLocked ? 'text-muted-foreground' : 'text-primary'}`} />
                  </div>
                  <CardTitle className="text-xl">Level {levelNumber} Certificate</CardTitle>
                  <CardDescription>
                    {level.title}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="min-h-[100px] border border-dashed border-border rounded-md flex items-center justify-center p-6">
                    {isLocked ? (
                      <div className="text-center text-muted-foreground">
                        <p className="font-semibold">Certificate Locked</p>
                        <p className="text-sm mt-1">Complete Level {levelNumber} to unlock</p>
                      </div>
                    ) : isCompleted ? (
                      <div className="space-y-2 w-full">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Issued: {new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="text-center py-4">
                          <p className="text-lg font-bold">Certificate of Completion</p>
                          <p className="text-sm mt-1">This certifies that</p>
                          <p className="font-semibold mt-1">{user.username}</p>
                          <p className="text-sm mt-1">has successfully completed</p>
                          <p className="font-semibold mt-1">{level.title}</p>
                          <p className="text-sm mt-1">in the</p>
                          <p className="font-semibold mt-1">{profile.careerPath} Track</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        <p>Current Level</p>
                        <p className="text-sm mt-1">Complete to earn certificate</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" disabled={!isCompleted}>
                    <Info className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button size="sm" disabled={!isCompleted}>
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        {/* No certificates yet */}
        {currentLevel === 1 && (
          <Card className="mt-8">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">No Certificates Yet</h3>
              <p className="text-muted-foreground mb-4">Complete your first level to earn a certificate</p>
              <Button onClick={() => navigate('/roadmap')}>View Roadmap</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default CertificatesPage;
