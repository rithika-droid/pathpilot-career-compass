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
import { useAuth } from '@/hooks/useAuth';
import { findBestResponse } from '@/data/chatbotData';

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
  const { userProfile } = useAuth();

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
    
    // Generate personalized response
    setTimeout(() => {
      // Get response from the improved chatbot data
      let response = findBestResponse(inputValue);
      
      // Personalize with user data if available
      if (userProfile) {
        // Insert user's level or career path info if available
        if (userProfile.level) {
          response = response.replace('your current level', `Level ${userProfile.level}`);
        }
        
        if (userProfile.careerPath) {
          response = response.replace('based on your interests', 
            `based on your interest in ${userProfile.careerPath}`);
        }
      }
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
      
      // Save chat history to localStorage
      const savedMessages = [...messages, userMessage, botMessage];
      if (savedMessages.length > 20) {
        // Keep only the last 20 messages to prevent localStorage from growing too large
        savedMessages.splice(0, savedMessages.length - 20);
      }
      localStorage.setItem('pathpilot_chat_history', JSON.stringify(savedMessages));
    }, 1200);
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
  
  // Load chat history from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem('pathpilot_chat_history');
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          // Convert string timestamps back to Date objects
          const processedMessages = parsedMessages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }));
          setMessages(processedMessages);
        }
      } catch (e) {
        console.error('Error parsing chat history:', e);
      }
    }
  }, []);

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
              <AvatarImage src="/placeholder.svg" alt="PathPilot Assistant" />
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
              <div className="mt-2 text-xs text-muted-foreground">
                <p>Try asking: "What courses should I take?" or "How do I become a UI/UX designer?"</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Chatbot;
