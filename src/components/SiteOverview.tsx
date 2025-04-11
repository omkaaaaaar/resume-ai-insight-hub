
import { useState } from "react";
import { Menu, Info, ArrowUpRight, Star, FileText, ListChecks, Bot, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Resume tip articles with sources
const resumeTips = [
  {
    title: "How to Write an ATS-Friendly Resume",
    source: "Harvard Business Review",
    url: "https://hbr.org/2023/02/how-to-write-a-resume-that-wont-get-rejected-by-ats",
    icon: "📄"
  },
  {
    title: "Quantify Your Achievements",
    source: "LinkedIn Talent Blog",
    url: "https://www.linkedin.com/business/talent/blog/talent-acquisition/resume-tips-to-help-you-get-hired",
    icon: "📊"
  },
  {
    title: "Resume Design Principles",
    source: "Adobe Design",
    url: "https://www.adobe.com/creativecloud/design/discover/resume-design.html",
    icon: "🎨"
  },
  {
    title: "Technical Resume Guide",
    source: "GitHub Education",
    url: "https://education.github.com/graduate/guide",
    icon: "💻"
  },
  {
    title: "Cover Letter Best Practices",
    source: "Career Experts",
    url: "https://www.indeed.com/career-advice/resumes-cover-letters/cover-letter-tips",
    icon: "✉️"
  }
];

const SiteOverview = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/80 to-violet-500/90 backdrop-blur-sm shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300 border-0 text-white group"
          >
            <Menu className={`h-5 w-5 transition-all duration-300 ${isOpen ? 'rotate-90 text-white' : ''}`} />
            <span className="sr-only">Toggle menu</span>
            <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden bg-white/95 backdrop-blur-sm border border-primary/20 shadow-2xl rounded-xl">
          <div className="bg-gradient-to-r from-primary/90 to-violet-600/80 py-5 px-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-5 w-5" />
              <h3 className="font-bold text-sm tracking-wide">RESUME ANALYZER</h3>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">AI-powered resume analysis and feedback for job seekers. Get professional insights to land your dream job!</p>
          </div>
          
          <div className="p-2 bg-gradient-to-b from-white to-secondary/10">
            <DropdownMenuItem 
              className="cursor-pointer rounded-lg flex items-center px-3 py-3 gap-3 hover:bg-primary/5 transform transition-all hover:scale-[1.02] hover:shadow-md"
              onSelect={() => navigate("/")}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 text-amber-600">
                <Star className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">Resume Upload</p>
                <p className="text-xs text-muted-foreground">Submit your resume for analysis</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-primary/60" />
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-2 bg-primary/10" />
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer rounded-lg flex items-center px-3 py-3 gap-3 hover:bg-primary/5 transform transition-all hover:scale-[1.02] hover:shadow-md">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600">
                  <ListChecks className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Resume Tips</p>
                  <p className="text-xs text-muted-foreground">Best practices for your resume</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent 
                  className="min-w-[280px] p-2 bg-white/95 backdrop-blur-sm border border-primary/20 shadow-lg rounded-xl"
                  sideOffset={10}
                  alignOffset={-5}
                >
                  <div className="p-2 bg-gradient-to-r from-primary/10 to-primary/5 mb-2 rounded-lg">
                    <h4 className="text-xs font-medium text-primary mb-1">EXPERT TIPS</h4>
                    <p className="text-xs text-muted-foreground">Curated advice from industry professionals</p>
                  </div>
                  
                  {resumeTips.map((tip, index) => (
                    <DropdownMenuItem 
                      key={index}
                      className="cursor-pointer rounded-lg flex items-center gap-2 px-3 py-2.5 hover:bg-muted group"
                      onClick={() => window.open(tip.url, "_blank")}
                    >
                      <span className="text-lg">{tip.icon}</span>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">{tip.title}</p>
                        <p className="text-xs text-muted-foreground">Source: {tip.source}</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            
            <DropdownMenuItem 
              className="cursor-pointer rounded-lg flex items-center px-3 py-3 gap-3 hover:bg-primary/5 transform transition-all hover:scale-[1.02] hover:shadow-md" 
              onSelect={() => {
                // Find and trigger the AI Assistant button
                const aiButton = document.querySelector("#ai-assistant-button") as HTMLButtonElement;
                if (aiButton) aiButton.click();
                setIsOpen(false);
              }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-violet-100 text-violet-600 pulse">
                <Bot className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Get help from our AI assistant</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-primary/60" />
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-2 bg-primary/10" />
            
            <DropdownMenuItem 
              className="cursor-pointer rounded-lg flex items-center px-3 py-3 gap-3 hover:bg-primary/5 transform transition-all hover:scale-[1.02] hover:shadow-md" 
              onSelect={() => navigate("/login")}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                <UserCog className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">User/HR Login</p>
                <p className="text-xs text-muted-foreground">Access your account</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-primary/60" />
            </DropdownMenuItem>
          </div>
          
          <div className="p-2 bg-gradient-to-t from-primary/5 to-transparent text-center">
            <p className="text-xs text-muted-foreground py-1">© 2025 Resume Analyzer • AI-Powered</p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SiteOverview;
