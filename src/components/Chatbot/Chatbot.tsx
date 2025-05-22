
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  MessageSquare,
  Send,
  X,
  MinusCircle,
  MaximizeIcon,
  User as UserIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hi there! 👋 I'm your PathPilot Assistant. I can help you with career guidance, explain tech paths, or answer questions about courses. How can I assist you today?",
    sender: 'bot',
    timestamp: new Date()
  }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sample responses for demo
  const sampleResponses = [
    "Based on your interest in AI and machine learning, I recommend exploring the Data Scientist or ML Engineer path. These careers have excellent growth prospects and allow you to work on cutting-edge technology.",
    "For someone studying Computer Science, I'd suggest looking into these areas: Software Engineering, Data Science, Cybersecurity, or AI/ML. Each has different skill requirements and salary potential.",
    "To become a successful full-stack developer, focus on learning: HTML/CSS/JavaScript, a frontend framework like React, backend development with Node.js or Python, and database management. I can help you find resources for each.",
    "The difference between Data Science and AI/ML is that Data Science focuses on extracting insights from data, while AI/ML is about creating systems that can learn and make decisions. Both are related but require slightly different skill sets.",
    "For internship preparation, I recommend: 1) Build a strong portfolio on GitHub, 2) Practice coding interviews on platforms like LeetCode, 3) Customize your resume for each application, and 4) Research the company before interviews."
  ];

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    
    // Simulate bot typing
    setTimeout(() => {
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  return (
    <>
      {/* Floating chat button */}
      <Button
        onClick={toggleChatbot}
        className={cn(
          "fixed bottom-5 right-5 z-50 h-14 w-14 rounded-full shadow-lg",
          isOpen ? "bg-red-500 hover:bg-red-600" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
      
      {/* Chat window */}
      <div
        className={cn(
          "fixed right-5 bottom-24 z-40 w-80 sm:w-96 rounded-lg shadow-lg border border-border bg-background transition-all duration-300 ease-in-out transform",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none",
          isMinimized ? "h-14" : "h-[30rem]"
        )}
      >
        {/* Chat header */}
        <div className="flex items-center justify-between p-3 border-b border-border rounded-t-lg bg-primary/10">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8 bg-primary">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-primary text-primary-foreground">PP</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-sm">PathPilot Assistant</h3>
              <p className="text-xs text-muted-foreground">Career Guide</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" onClick={toggleMinimize} className="h-8 w-8">
              {isMinimized ? <MaximizeIcon className="h-4 w-4" /> : <MinusCircle className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Chat messages */}
        {!isMinimized && (
          <div className="flex flex-col h-[calc(30rem-2.5rem-3.5rem)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-start gap-2",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  {message.sender === 'bot' && (
                    <Avatar className="h-8 w-8 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground">PP</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div
                    className={cn(
                      "rounded-lg p-3 max-w-[80%]",
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50"
                    )}
                  >
                    <p className="text-sm break-words">{message.text}</p>
                    <p className="text-[10px] mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                  
                  {message.sender === 'user' && (
                    <Avatar className="h-8 w-8 bg-secondary">
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        <UserIcon className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex items-start gap-2">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="bg-primary text-primary-foreground">PP</AvatarFallback>
                  </Avatar>
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="flex space-x-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat input */}
            <div className="p-3 border-t border-border">
              <div className="flex items-center space-x-2">
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask for career guidance..."
                  className="flex-1"
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="icon"
                  disabled={inputValue.trim() === ''}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
