
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent, 
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, X, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! I'm your Resume Assistant. How can I help you optimize your resume today?",
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responses = [
        "For a stronger resume, quantify your achievements with specific metrics instead of using general statements.",
        "Make sure to tailor your resume keywords to match the job description you're applying for.",
        "Remember to keep your resume to one page if you have less than 10 years of experience.",
        "Use action verbs at the beginning of your bullet points to make your achievements more impactful.",
        "Consider adding a skills section that highlights your technical and soft skills relevant to the position.",
        "Proofread carefully! Typos and grammatical errors can immediately disqualify you.",
        "Include your LinkedIn and GitHub profiles prominently at the top of your resume for tech positions."
      ];
      
      // Choose a random response based on keywords in the user's message
      let responseText = "";
      
      if (message.toLowerCase().includes('format')) {
        responseText = "For optimal formatting, use consistent spacing, clear section headings, and a clean professional font like Arial or Calibri at 10-12pt size.";
      } else if (message.toLowerCase().includes('skills')) {
        responseText = "When listing skills, prioritize those mentioned in the job description. Organize them by proficiency level or by type (technical, soft skills, etc).";
      } else if (message.toLowerCase().includes('experience') || message.toLowerCase().includes('job')) {
        responseText = "For each job experience, include 3-5 bullet points that showcase your accomplishments rather than just responsibilities. Use numbers and percentages when possible.";
      } else if (message.toLowerCase().includes('education')) {
        responseText = "In your education section, include your degree, institution, graduation date, and relevant coursework or academic achievements if you're a recent graduate.";
      } else if (message.toLowerCase().includes('ats') || message.toLowerCase().includes('tracking')) {
        responseText = "To pass ATS screening, incorporate keywords from the job description naturally throughout your resume and avoid using tables, headers/footers, or complex formatting.";
      } else {
        // Random response if no keywords match
        responseText = responses[Math.floor(Math.random() * responses.length)];
      }
      
      const assistantMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };
  
  const toggleChatbot = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsMinimized(false);
    }
  };
  
  return (
    <>
      {isOpen ? (
        <div 
          className={cn(
            "fixed bottom-6 right-6 bg-card shadow-custom rounded-xl overflow-hidden transition-all duration-300 z-50",
            isMinimized ? "w-72 h-16" : "w-80 sm:w-96 h-[500px]"
          )}
        >
          <div className="flex items-center justify-between bg-primary p-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center">
                <MessageCircle size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-primary-foreground">Resume Assistant</h3>
              </div>
            </div>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMinimize}
                className="h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground"
              >
                {isMinimized ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleChatbot}
                className="h-8 w-8 hover:bg-primary-foreground/20 text-primary-foreground"
              >
                <X size={18} />
              </Button>
            </div>
          </div>
          
          {!isMinimized && (
            <>
              <div className="flex-1 p-4 h-[404px] overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={cn(
                        "flex",
                        msg.sender === 'user' ? "justify-end" : "justify-start"
                      )}
                    >
                      <div 
                        className={cn(
                          "max-w-[80%] px-4 py-2 rounded-lg",
                          msg.sender === 'user' 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-secondary text-secondary-foreground"
                        )}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <form onSubmit={handleSendMessage} className="p-3 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={!message.trim()}>
                    <Send size={18} />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      ) : (
        <Button
          onClick={toggleChatbot}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          size="icon"
        >
          <MessageCircle size={24} />
        </Button>
      )}
    </>
  );
};

export default AIAssistant;
