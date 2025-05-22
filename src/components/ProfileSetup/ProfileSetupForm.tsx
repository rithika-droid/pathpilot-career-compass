
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '../../hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { careerDecisionAlgorithm } from '../../utils/careerAlgorithm';

const ProfileSetupForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    year: '',
    branch: '',
    financialStatus: '',
    abroadPlans: '',
    purpose: '',
  });

  const { updateProfile, user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Use career decision algorithm to determine best path
    const suggestedCareer = careerDecisionAlgorithm(formData);
    
    const profile = {
      ...formData,
      careerPath: suggestedCareer,
      level: 1,
      points: 0,
      badges: [],
    };

    updateProfile(profile);
    
    toast({
      title: "Profile Setup Complete!",
      description: `We've found your perfect path: ${suggestedCareer}`,
    });
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-secondary/20">
      <Card className="w-full max-w-2xl bg-card/50 backdrop-blur-lg border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Let's Find Your Perfect Path
          </CardTitle>
          <CardDescription className="text-lg">
            Answer a few questions to get personalized career recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">10+2 Subject</label>
                <Select onValueChange={(value) => updateField('subject', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your 10+2 subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MPC">MPC (Maths, Physics, Chemistry)</SelectItem>
                    <SelectItem value="BiPC">BiPC (Biology, Physics, Chemistry)</SelectItem>
                    <SelectItem value="MEC">MEC (Maths, Economics, Commerce)</SelectItem>
                    <SelectItem value="CEC">CEC (Commerce, Economics, Civics)</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Current Academic Year</label>
                <Select onValueChange={(value) => updateField('year', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1st">1st Year</SelectItem>
                    <SelectItem value="2nd">2nd Year</SelectItem>
                    <SelectItem value="3rd">3rd Year</SelectItem>
                    <SelectItem value="4th">4th Year</SelectItem>
                    <SelectItem value="Graduated">Graduated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Branch</label>
                <Select onValueChange={(value) => updateField('branch', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CSE">Computer Science Engineering</SelectItem>
                    <SelectItem value="CS">Computer Science</SelectItem>
                    <SelectItem value="DS">Data Science</SelectItem>
                    <SelectItem value="AI/ML">AI & Machine Learning</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Family Financial Status</label>
                <Select onValueChange={(value) => updateField('financialStatus', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select financial status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3">0-3 LPA</SelectItem>
                    <SelectItem value="3-6">3-6 LPA</SelectItem>
                    <SelectItem value="6-12">6-12 LPA</SelectItem>
                    <SelectItem value="12-25">12-25 LPA</SelectItem>
                    <SelectItem value="25+">25+ LPA</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Plans to go abroad?</label>
                <Select onValueChange={(value) => updateField('abroadPlans', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes, definitely</SelectItem>
                    <SelectItem value="Not Sure">Not sure</SelectItem>
                    <SelectItem value="No">No, prefer India</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Primary Purpose</label>
                <Select onValueChange={(value) => updateField('purpose', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your purpose" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Job">Get a good job</SelectItem>
                    <SelectItem value="Higher Studies">Higher studies</SelectItem>
                    <SelectItem value="Entrepreneurship">Start a business</SelectItem>
                    <SelectItem value="Research">Research career</SelectItem>
                    <SelectItem value="Not Sure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 text-lg font-semibold"
              disabled={Object.values(formData).some(value => !value)}
            >
              Find My Perfect Career Path 🚀
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSetupForm;
