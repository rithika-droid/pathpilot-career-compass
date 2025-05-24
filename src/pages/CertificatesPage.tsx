
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Award, Info, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { careerPaths } from '../data/careerPaths';
import { useNavigate } from 'react-router-dom';

interface Certificate {
  id: string;
  title: string;
  description: string;
  careerPath: string;
  level: number;
  issuedAt: string;
  score?: number;
}

const CertificatesPage = () => {
  const { user, userProfile, profile } = useAuth();
  const navigate = useNavigate();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  
  useEffect(() => {
    // Load certificates from localStorage
    const savedCertificates = JSON.parse(localStorage.getItem('pathpilot_certificates') || '[]');
    setCertificates(savedCertificates);
  }, []);

  if (!userProfile?.careerPath) {
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

  const currentLevel = userProfile.level || 1;
  const careerPath = careerPaths[userProfile.careerPath];
  
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

  const displayName = localStorage.getItem('pathpilot_display_name') || 
                     profile?.username || 
                     user?.user_metadata?.full_name || 
                     user?.email?.split('@')[0] || 
                     'User';

  const handleDownloadCertificate = (certificate: Certificate) => {
    // Simple text-based certificate download
    const certificateText = `
CERTIFICATE OF COMPLETION

This certifies that

${displayName}

has successfully completed

${certificate.title}
${certificate.description}

in the ${userProfile.careerPath} Track

Score: ${certificate.score || 'N/A'}%
Issued: ${new Date(certificate.issuedAt).toLocaleDateString()}

PathPilot Learning Platform
    `;

    const blob = new Blob([certificateText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${certificate.title.replace(/\s+/g, '_')}_Certificate.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-16">
        <h1 className="text-3xl font-bold mb-2">Your Certificates</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Track your progress and showcase your achievements
        </p>
        
        {certificates.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Earned Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {certificates.map((certificate) => (
                <Card key={certificate.id} className="border-green-500 bg-green-50/50 dark:bg-green-950/20">
                  <CardHeader className="relative">
                    <div className="absolute top-4 right-4">
                      <Award className="h-8 w-8 text-green-500" />
                    </div>
                    <CardTitle className="text-xl">{certificate.title}</CardTitle>
                    <CardDescription>
                      {certificate.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-2 w-full">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Issued: {new Date(certificate.issuedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-center py-4 bg-white/50 dark:bg-gray-800/50 rounded border-2 border-dashed border-green-300">
                        <p className="text-lg font-bold">Certificate of Completion</p>
                        <p className="text-sm mt-1">This certifies that</p>
                        <p className="font-semibold mt-1">{displayName}</p>
                        <p className="text-sm mt-1">has successfully completed</p>
                        <p className="font-semibold mt-1">{certificate.description}</p>
                        <p className="text-sm mt-1">in the</p>
                        <p className="font-semibold mt-1">{userProfile.careerPath} Track</p>
                        {certificate.score && (
                          <p className="text-sm mt-2 text-green-600">Score: {certificate.score}%</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm">
                      <Info className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                    <Button size="sm" onClick={() => handleDownloadCertificate(certificate)}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        <h2 className="text-xl font-semibold mb-4">Available Certificates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerPath.levels.map((level, index) => {
            const levelNumber = index + 1;
            const isCompleted = levelNumber < currentLevel;
            const isLocked = levelNumber > currentLevel;
            const hasEarnedCertificate = certificates.some(cert => cert.level === levelNumber);
            
            return (
              <Card 
                key={index} 
                className={`${isLocked ? 'opacity-60' : isCompleted ? 'border-green-500' : ''}`}
              >
                <CardHeader className="relative">
                  <div className="absolute top-4 right-4">
                    <Award className={`h-8 w-8 ${
                      hasEarnedCertificate ? 'text-green-500' : 
                      isCompleted ? 'text-yellow-500' : 
                      isLocked ? 'text-muted-foreground' : 'text-primary'
                    }`} />
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
                    ) : hasEarnedCertificate ? (
                      <div className="text-center text-green-600">
                        <Award className="h-8 w-8 mx-auto mb-2" />
                        <p className="font-semibold">Certificate Earned!</p>
                        <p className="text-sm mt-1">View in Earned Certificates section above</p>
                      </div>
                    ) : isCompleted ? (
                      <div className="text-center text-yellow-600">
                        <p className="font-semibold">Level Completed</p>
                        <p className="text-sm mt-1">Take the quiz to earn your certificate</p>
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
                  <Button variant="outline" size="sm" disabled={!isCompleted && !hasEarnedCertificate}>
                    <Info className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button 
                    size="sm" 
                    disabled={!hasEarnedCertificate}
                    onClick={() => {
                      if (hasEarnedCertificate) {
                        const cert = certificates.find(c => c.level === levelNumber);
                        if (cert) handleDownloadCertificate(cert);
                      }
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
        
        {/* No certificates yet */}
        {certificates.length === 0 && currentLevel === 1 && (
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
