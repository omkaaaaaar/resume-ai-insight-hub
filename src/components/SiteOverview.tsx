
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
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white hover:shadow-lg transition-all hover:scale-105 border-primary/20 group"
          >
            <Menu className={`h-5 w-5 transition-all duration-300 group-hover:text-primary ${isOpen ? 'rotate-90 text-primary' : ''}`} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden bg-white/95 backdrop-blur-sm border border-border/40 shadow-xl rounded-xl">
          <div className="bg-gradient-to-r from-primary/90 to-primary/70 py-4 px-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Info className="h-5 w-5" />
              <h3 className="font-bold text-sm">RESUME ANALYZER</h3>
            </div>
            <p className="text-xs opacity-90">AI-powered resume analysis and feedback for job seekers</p>
          </div>
          
          <div className="p-2">
            <DropdownMenuItem className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted transform transition-all hover:scale-[1.02]" onSelect={() => navigate("/")}>
              <Star className="h-5 w-5 text-amber-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">Resume Upload</p>
                <p className="text-xs text-muted-foreground">Submit your resume for analysis</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted transform transition-all hover:scale-[1.02]" onSelect={() => navigate("/results")}>
              <FileText className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">Resume Results</p>
                <p className="text-xs text-muted-foreground">View your resume insights</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted transform transition-all hover:scale-[1.02]">
                <ListChecks className="h-5 w-5 text-emerald-500" />
                <div className="flex-1">
                  <p className="font-medium text-sm">Resume Tips</p>
                  <p className="text-xs text-muted-foreground">Best practices for your resume</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className="min-w-[250px] p-2 bg-white/95 backdrop-blur-sm border border-border/40 shadow-lg rounded-xl">
                  {resumeTips.map((tip, index) => (
                    <DropdownMenuItem 
                      key={index}
                      className="cursor-pointer rounded-lg flex items-center gap-2 px-3 py-2 hover:bg-muted"
                      onClick={() => window.open(tip.url, "_blank")}
                    >
                      <span className="text-lg">{tip.icon}</span>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-medium text-sm truncate">{tip.title}</p>
                        <p className="text-xs text-muted-foreground">Source: {tip.source}</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            
            <DropdownMenuItem 
              className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted transform transition-all hover:scale-[1.02]" 
              onSelect={() => {
                // Find and trigger the AI Assistant button
                const aiButton = document.querySelector("#ai-assistant-button") as HTMLButtonElement;
                if (aiButton) aiButton.click();
                setIsOpen(false);
              }}
            >
              <Bot className="h-5 w-5 text-violet-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Get help from our AI assistant</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted transform transition-all hover:scale-[1.02]" onSelect={() => navigate("/login")}>
              <UserCog className="h-5 w-5 text-red-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">User/HR Login</p>
                <p className="text-xs text-muted-foreground">Access your account</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SiteOverview;
