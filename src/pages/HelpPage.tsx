
import React from 'react';
import MainLayout from '../components/Layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, MessageSquare, FileQuestion, BookOpen, Phone } from 'lucide-react';

const HelpPage = () => {
  const faqs = [
    {
      question: "How do I start my career assessment?",
      answer: "To start your career assessment, go to the Profile Setup page from the navigation menu. Fill in the requested information about your background, preferences, and goals. Our algorithm will then recommend the best career path for you."
    },
    {
      question: "Can I change my career path later?",
      answer: "Yes, you can change your career path at any time. Go to your Profile Settings, and select the option to retake the career assessment. Your progress in previous paths will be saved."
    },
    {
      question: "How are courses structured in PathPilot?",
      answer: "Each career path consists of 5 levels, with each level containing multiple courses. Courses include video lectures, reading materials, quizzes, and projects. You need to complete all courses in a level to unlock the next level."
    },
    {
      question: "How do I earn certificates?",
      answer: "Certificates are earned by completing all requirements for a specific course or level. This typically includes watching all lectures, submitting required projects, and passing the final assessment with a score of at least 70%."
    },
    {
      question: "What are points and badges used for?",
      answer: "Points and badges are part of PathPilot's gamification system. You earn points by completing lessons, courses, and challenges. These points can be redeemed for rewards like premium content, mentorship sessions, or resume reviews. Badges are earned for specific achievements and showcase your skills on your profile."
    },
    {
      question: "How can I get personalized help with my career questions?",
      answer: "You can use the AI career assistant chatbot available at the bottom right of every page. For more in-depth guidance, you can also schedule a session with a career advisor through the Rewards section once you've earned enough points."
    }
  ];
  
  const supportCategories = [
    {
      title: "Career Guidance",
      icon: <HelpCircle className="h-8 w-8" />,
      description: "Get help with choosing the right career path"
    },
    {
      title: "Course Support",
      icon: <BookOpen className="h-8 w-8" />,
      description: "Questions about course content or completion"
    },
    {
      title: "Technical Help",
      icon: <FileQuestion className="h-8 w-8" />,
      description: "Platform issues or technical problems"
    },
    {
      title: "Chat with Support",
      icon: <MessageSquare className="h-8 w-8" />,
      description: "Live chat with our support team"
    }
  ];
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 pt-20 pb-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Help Center</h1>
          <p className="text-xl text-muted-foreground">
            Find answers and support for your PathPilot journey
          </p>
        </div>
        
        {/* Search Section */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles..."
                  className="pl-10 h-12"
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-4 justify-center">
                <Button variant="outline" size="sm">Career Assessment</Button>
                <Button variant="outline" size="sm">Certificates</Button>
                <Button variant="outline" size="sm">Account Settings</Button>
                <Button variant="outline" size="sm">Course Progress</Button>
                <Button variant="outline" size="sm">Technical Issues</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Support Categories */}
        <h2 className="text-2xl font-semibold mb-4">Support Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {supportCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="mx-auto rounded-full bg-primary/10 p-3 w-16 h-16 flex items-center justify-center mb-4">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-lg mb-1">{category.title}</h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* FAQs Section */}
        <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
        <Card className="mb-10">
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
        
        {/* Contact Section */}
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <Card>
          <CardHeader>
            <CardTitle>Get in Touch</CardTitle>
            <CardDescription>We're here to help with any questions you might have</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium">Your Name</label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium">Your Email</label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium">Subject</label>
                    <Input id="subject" placeholder="Help with..." />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium">Message</label>
                    <textarea 
                      id="message" 
                      rows={4} 
                      className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="Describe your issue or question..."
                    ></textarea>
                  </div>
                  
                  <Button type="submit" className="w-full">Submit Request</Button>
                </form>
              </div>
              
              <div className="flex flex-col justify-center space-y-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Live Chat</h3>
                    <p className="text-sm text-muted-foreground mb-1">Available 24/7 for immediate help</p>
                    <Button variant="link" className="p-0 h-auto">Start Chat</Button>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone Support</h3>
                    <p className="text-sm text-muted-foreground mb-1">Call us Mon-Fri, 9am-5pm EST</p>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <HelpCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Help Center</h3>
                    <p className="text-sm text-muted-foreground mb-1">Browse our knowledge base</p>
                    <Button variant="link" className="p-0 h-auto">Visit Help Center</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default HelpPage;
