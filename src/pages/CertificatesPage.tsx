
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Download, Calendar, Share2 } from 'lucide-react';

const CertificatesPage = () => {
  const certificates = [
    {
      id: 1,
      title: "Fundamentals of Programming",
      issueDate: "April 15, 2025",
      issuer: "PathPilot Academy",
      credentialId: "PP-FP-2025-1234",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      title: "Data Structures and Algorithms - Level 1",
      issueDate: "May 22, 2025",
      issuer: "PathPilot Academy",
      credentialId: "PP-DSA1-2025-5678",
      image: "/placeholder.svg"
    }
  ];
  
  const pendingCertificates = [
    {
      id: 3,
      title: "Full-Stack Web Development",
      progress: 75,
      requirements: [
        { name: "Complete all course modules", done: false },
        { name: "Submit final project", done: false },
        { name: "Pass certification exam", done: false }
      ]
    },
    {
      id: 4,
      title: "Machine Learning Essentials",
      progress: 45,
      requirements: [
        { name: "Complete all course modules", done: false },
        { name: "Implement ML model", done: false },
        { name: "Pass certification exam", done: false }
      ]
    }
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Your Certificates</h1>
          <p className="text-xl text-muted-foreground">
            View and download your earned certificates
          </p>
        </div>
        
        {certificates.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Earned Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {certificates.map((cert) => (
                <Card key={cert.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative bg-gradient-to-r from-primary/20 to-accent/20 aspect-[4/3] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 to-transparent opacity-70"></div>
                    <div className="relative z-10">
                      <Award className="h-16 w-16 text-primary mx-auto mb-2" />
                      <h3 className="text-center font-bold text-xl">{cert.title}</h3>
                      <p className="text-center text-sm text-muted-foreground">{cert.issuer}</p>
                    </div>
                  </div>
                  
                  <CardContent className="pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Issued Date:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        {cert.issueDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Credential ID:</span>
                      <span className="font-mono text-xs">{cert.credentialId}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between gap-2">
                    <Button variant="outline" className="flex-1">
                      <Share2 className="h-4 w-4 mr-2" /> Share
                    </Button>
                    <Button className="flex-1">
                      <Download className="h-4 w-4 mr-2" /> Download
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </>
        ) : null}
        
        {pendingCertificates.length > 0 ? (
          <>
            <h2 className="text-2xl font-semibold mb-4">Certificates in Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingCertificates.map((cert) => (
                <Card key={cert.id} className="border-dashed">
                  <CardHeader>
                    <CardTitle>{cert.title}</CardTitle>
                    <CardDescription>
                      {cert.progress}% requirements completed
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {cert.requirements.map((req, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className={`h-5 w-5 rounded-full border ${req.done ? 'bg-green-500 border-green-500' : 'border-muted-foreground'} flex items-center justify-center`}>
                            {req.done && <span className="text-white text-xs">✓</span>}
                          </div>
                          <span className={req.done ? 'line-through text-muted-foreground' : ''}>
                            {req.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </MainLayout>
  );
};

export default CertificatesPage;
