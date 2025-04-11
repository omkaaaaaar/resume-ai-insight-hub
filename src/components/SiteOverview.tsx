
import { useState, useEffect } from "react";
import { Menu, Info, ArrowUpRight, Star, FileText, ListChecks, Bot, UserCog, Sun, Moon } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";

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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved theme preference or system preference
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "dark" || 
        (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

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
        <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-primary/20 shadow-2xl rounded-xl">
          <div className="bg-gradient-to-r from-primary/90 to-violet-600/80 py-5 px-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-5 w-5" />
              <h3 className="font-bold text-sm tracking-wide">
                <span className="text-gradient-glow">ResumeLens.AI</span>
              </h3>
            </div>
            <p className="text-xs opacity-90 leading-relaxed">AI-powered resume analysis and feedback for job seekers. Get professional insights to land your dream job!</p>
          </div>
          
          <div className="p-2 bg-gradient-to-b from-white to-secondary/10 dark:from-gray-900 dark:to-gray-800/30">
            <div className="flex items-center justify-between p-2 mb-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2">
                {isDarkMode ? <Moon className="h-4 w-4 text-indigo-300" /> : <Sun className="h-4 w-4 text-amber-400" />}
                <span className="text-sm font-medium">{isDarkMode ? 'Dark' : 'Light'} Mode</span>
              </div>
              <Switch 
                checked={isDarkMode} 
                onCheckedChange={toggleDarkMode} 
                className="data-[state=checked]:bg-indigo-600" 
              />
            </div>
            
            <DropdownMenuItem 
              className="cursor-pointer rounded-lg flex items-center px-3 py-3 gap-3 hover:bg-primary/5 dark:hover:bg-white/5 transform transition-all hover:scale-[1.02] hover:shadow-md bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30"
              onSelect={() => navigate("/")}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 shadow-inner">
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
              <DropdownMenuSubTrigger className="cursor-pointer rounded-lg flex items-center px-3 py-3 gap-3 hover:bg-primary/5 dark:hover:bg-white/5 transform transition-all hover:scale-[1.02] hover:shadow-md bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 shadow-inner">
                  <ListChecks className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">Resume Tips</p>
                  <p className="text-xs text-muted-foreground">Best practices for your resume</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent 
                  className="min-w-[280px] p-2 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border border-primary/20 shadow-lg rounded-xl"
                  sideOffset={10}
                  alignOffset={-5}
                >
                  <div className="p-2 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 mb-2 rounded-lg">
                    <h4 className="text-xs font-medium text-primary dark:text-primary-foreground mb-1">EXPERT TIPS</h4>
                    <p className="text-xs text-muted-foreground">Curated advice from industry professionals</p>
                  </div>
                  
                  {resumeTips.map((tip, index) => (
                    <DropdownMenuItem 
                      key={index}
                      className="cursor-pointer rounded-lg flex items-center gap-2 px-3 py-2.5 hover:bg-muted dark:hover:bg-gray-800 group transform transition-all hover:scale-[1.01]"
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
              className="cursor-pointer rounded-lg flex items-center px-3 py-3 gap-3 hover:bg-primary/5 dark:hover:bg-white/5 transform transition-all hover:scale-[1.02] hover:shadow-md bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30" 
              onSelect={() => {
                // Find and trigger the AI Assistant button
                const aiButton = document.querySelector("#ai-assistant-button") as HTMLButtonElement;
                if (aiButton) aiButton.click();
                setIsOpen(false);
              }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-400 pulse">
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
              className="cursor-pointer rounded-lg flex items-center px-3 py-3 gap-3 hover:bg-primary/5 dark:hover:bg-white/5 transform transition-all hover:scale-[1.02] hover:shadow-md bg-gradient-to-r from-white/50 to-white/30 dark:from-gray-800/50 dark:to-gray-800/30" 
              onSelect={() => navigate("/login")}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 shadow-inner">
                <UserCog className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">User/HR Login</p>
                <p className="text-xs text-muted-foreground">Access your account</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-primary/60" />
            </DropdownMenuItem>
          </div>
          
          <div className="p-2 bg-gradient-to-t from-primary/5 to-transparent dark:from-primary/10 text-center">
            <p className="text-xs text-muted-foreground py-1">© 2025 ResumeLens.AI • AI-Powered</p>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SiteOverview;
