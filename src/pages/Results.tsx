import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, GithubIcon, Linkedin, FileText, Trophy, Award, Mail } from "lucide-react";
import BackButton from "@/components/BackButton";

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeText: string;
}

const Results = () => {
  const { toast } = useToast();
  const [data, setData] = useState<ResumeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendToRecruiters, setSendToRecruiters] = useState(false);
  const [consentToLinkedIn, setConsentToLinkedIn] = useState(false);
  const [showCompanies, setShowCompanies] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  const scores = {
    overall: 87,
    format: 92,
    content: 85,
    keywords: 89,
    recommendations: [
      "Advance ML skills (e.g., TensorFlow projects)",
      "Build real-world data dashboards",
      "Improve backend knowledge for full-stack capabilities"
    ]
  };

  const companies = [
    { name: "TCS", location: "Navi Mumbai", role: "Data Analyst" },
    { name: "Wipro", location: "Gurgaon", role: "Frontend Developer" },
    { name: "Infosys", location: "Pune", role: "Backend Developer" }
  ];

  const handleCompanySelect = (companyName: string) => {
    setSelectedCompanies(prev => {
      if (prev.includes(companyName)) {
        return prev.filter(name => name !== companyName);
      }
      return [...prev, companyName];
    });
  };

  const handleSendEmail = () => {
    if (selectedCompanies.length > 0) {
      toast({
        title: "Email Sent Successfully",
        description: `Your resume has been sent to ${selectedCompanies.join(", ")}`,
        variant: "default",
      });
      setSelectedCompanies([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem('resumeData');
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Could not load resume data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  const handleSubmit = () => {
    setRefreshing(true);
    
    setTimeout(() => {
      toast({
        title: "Preferences Updated",
        description: sendToRecruiters 
          ? "Your resume will be shared with recruiters." 
          : "Your preferences have been saved.",
        variant: "default"
      });
      setRefreshing(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="text-center">
          <div className="inline-block p-4 bg-background rounded-full mb-4">
            <RefreshCw className="h-8 w-8 animate-spin text-primary" />
          </div>
          <h2 className="text-xl font-semibold mb-2">Loading Results</h2>
          <p className="text-muted-foreground">Please wait while we load your resume analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">
            Resume Analysis Results
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI has analyzed your resume. Here's a detailed breakdown of your professional profile.
          </p>
        </div>
        
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
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#eee"
                      strokeWidth="2"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="shadow-lg border border-border/40 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Resume Content
              </CardTitle>
              <CardDescription>Extracted from your uploaded resume</CardDescription>
            </CardHeader>
            <CardContent className="max-h-60 overflow-y-auto custom-scrollbar">
              <p className="whitespace-pre-wrap text-sm">
                <span className="font-bold">Core Skills:</span>
                Omkar is skilled in React, JavaScript, TypeScript, Tailwind CSS, and Python, making him a strong frontend candidate. He also holds relevant data skills like MongoDB, Power BI, NumPy, and Pandas, suitable for entry-level Data Analyst roles.

                <span className="font-bold">ML & Analytics:</span>
                Basic experience with scikit-learn, TensorFlow, and Jupyter Notebooks for data processing, model building, and visualization.

                <span className="font-bold">Strengths:</span>
                • Modern frontend tech stack
                • Familiarity with data tools and visualization platforms
                • Strong mix of UI and analytical thinking
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border border-border/40 bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-500" />
                Recommendations
              </CardTitle>
              <CardDescription>Ways to improve your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {scores.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8 shadow-lg border border-border/40 bg-white/95 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Choose how you'd like to use your resume data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="recruiters" 
                checked={sendToRecruiters}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setSendToRecruiters(checked);
                  }
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="recruiters"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Share resume with recruiters
                </label>
                <p className="text-sm text-muted-foreground">
                  Allow our partner recruiters to contact you about relevant job opportunities
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="linkedin" 
                checked={consentToLinkedIn}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setConsentToLinkedIn(checked);
                  }
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="linkedin"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  LinkedIn analysis
                </label>
                <p className="text-sm text-muted-foreground">
                  Allow us to analyze your LinkedIn profile for additional insights
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox 
                id="showCompanies"
                checked={showCompanies}
                onCheckedChange={(checked) => {
                  if (typeof checked === 'boolean') {
                    setShowCompanies(checked);
                    if (!checked) {
                      setSelectedCompanies([]);
                    }
                  }
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="showCompanies"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Show companies hiring for matching skills
                </label>
              </div>
            </div>

            {showCompanies && (
              <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-medium mb-3">Available Companies</h4>
                <div className="space-y-3">
                  {companies.map((company) => (
                    <div key={company.name} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`company-${company.name}`}
                        checked={selectedCompanies.includes(company.name)}
                        onCheckedChange={() => handleCompanySelect(company.name)}
                      />
                      <label htmlFor={`company-${company.name}`} className="text-sm">
                        {company.name} – {company.location} ({company.role})
                      </label>
                    </div>
                  ))}
                </div>
                {showCompanies && (
                  <Button 
                    className="mt-4"
                    onClick={handleSendEmail}
                    disabled={selectedCompanies.length === 0}
                  >
                    <Mail className="mr-2 h-4 w-4" />
                    Send Resume
                  </Button>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit} disabled={refreshing}>
              {refreshing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Preferences"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Results;
