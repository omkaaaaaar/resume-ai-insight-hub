
import { Trophy, GithubIcon, Linkedin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResumeData } from "@/types/resume";

interface ScoreCardsProps {
  data: ResumeData | null;
  scores: {
    overall: number;
  };
}

export const ScoreCards = ({ data, scores }: ScoreCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <Card className="slide-in shadow-lg border border-border/40 bg-white/95 backdrop-blur-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Overall Score
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center font-bold text-4xl">
                {scores.overall}%
              </div>
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#eee"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  strokeDasharray={`${scores.overall}, 100`}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="slide-in shadow-lg border border-border/40 bg-white/95 backdrop-blur-sm animation-delay-100">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <GithubIcon className="h-5 w-5 text-slate-700" />
            GitHub Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <a 
            href={data?.github || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-2"
          >
            {data?.github || "Not provided"}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </CardContent>
      </Card>
      
      <Card className="slide-in shadow-lg border border-border/40 bg-white/95 backdrop-blur-sm animation-delay-200">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-blue-600" />
            LinkedIn Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <a 
            href={data?.linkedin || "#"} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline flex items-center gap-2"
          >
            {data?.linkedin || "Not provided"}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </CardContent>
      </Card>
    </div>
  );
};
