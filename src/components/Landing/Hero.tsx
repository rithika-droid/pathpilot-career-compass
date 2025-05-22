
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Rocket, Target, Users } from 'lucide-react';

const Hero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Rocket className="h-4 w-4" />
            Pilot Your Passion to Success
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              PathPilot
            </span>
            <br />
            <span className="text-foreground">Find Your Perfect</span>
            <br />
            <span className="text-foreground">Tech Career</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Smart, interactive career guidance for CSE, CS, DS, and AI/ML students. 
            Let our advanced algorithm match you with your ideal tech career path.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="text-lg px-8 py-6 h-auto group">
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
              Explore Careers
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-3">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">50+</div>
                <div className="text-sm text-muted-foreground">Career Paths</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-lg mx-auto mb-3">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div className="text-3xl font-bold text-accent mb-1">10K+</div>
                <div className="text-sm text-muted-foreground">Students Guided</div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-card/50 backdrop-blur-sm rounded-lg p-6 border border-border/50">
                <div className="flex items-center justify-center w-12 h-12 bg-green-500/10 rounded-lg mx-auto mb-3">
                  <Rocket className="h-6 w-6 text-green-500" />
                </div>
                <div className="text-3xl font-bold text-green-500 mb-1">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
