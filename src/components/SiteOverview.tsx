
import { useState } from "react";
import { Menu, Info, ArrowUpRight, Star, FileText, ListChecks, MessageCircle, UserCog } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SiteOverview = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md hover:bg-white hover:shadow-lg transition-all">
            <Menu className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72 p-0 overflow-hidden bg-white/95 backdrop-blur-sm border border-border/40 shadow-xl rounded-xl">
          <div className="bg-gradient-to-r from-primary/90 to-primary/70 py-4 px-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Info className="h-5 w-5" />
              <h3 className="font-bold text-sm">RESUME ANALYZER</h3>
            </div>
            <p className="text-xs opacity-90">AI-powered resume analysis and feedback for job seekers</p>
          </div>
          
          <div className="p-2">
            <DropdownMenuItem className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted" onSelect={() => navigate("/")}>
              <Star className="h-5 w-5 text-amber-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">Resume Upload</p>
                <p className="text-xs text-muted-foreground">Submit your resume for analysis</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted" onSelect={() => navigate("/results")}>
              <FileText className="h-5 w-5 text-blue-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">Resume Results</p>
                <p className="text-xs text-muted-foreground">View your resume insights</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted" onSelect={() => {}}>
              <ListChecks className="h-5 w-5 text-emerald-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">Resume Tips</p>
                <p className="text-xs text-muted-foreground">Best practices for your resume</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
            
            <DropdownMenuItem className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted" onSelect={() => {}}>
              <MessageCircle className="h-5 w-5 text-violet-500" />
              <div className="flex-1">
                <p className="font-medium text-sm">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Get help from our AI assistant</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            
            <DropdownMenuItem className="cursor-pointer rounded-lg flex items-center px-3 py-2.5 gap-3 hover:bg-muted" onSelect={() => navigate("/login")}>
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
