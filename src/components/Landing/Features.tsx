
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Route, Trophy, MessageCircle, BookOpen, Certificate } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'Smart Decision Algorithm',
      description: 'Our AI-powered algorithm analyzes your background, goals, and preferences to find your perfect career match.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Route,
      title: 'Personalized Roadmaps',
      description: 'Get step-by-step learning paths with courses, projects, and milestones tailored to your chosen career.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Trophy,
      title: 'Progress Tracking',
      description: 'Track your learning journey with points, badges, and level progression to stay motivated.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MessageCircle,
      title: 'AI Career Chatbot',
      description: 'Get instant answers to your career questions from our intelligent chatbot available 24/7.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: BookOpen,
      title: 'Curated Resources',
      description: 'Access handpicked courses, tutorials, and practice materials for your specific career path.',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Certificate,
      title: 'Digital Certificates',
      description: 'Earn verified certificates as you complete each level of your learning journey.',
      color: 'from-teal-500 to-green-500'
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">PathPilot</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We combine cutting-edge technology with career expertise to guide you towards your dream tech career.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-2.5 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-full w-full text-white" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
