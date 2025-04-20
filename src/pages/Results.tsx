
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw } from "lucide-react";
import BackButton from "@/components/BackButton";
import { ScoreCards } from "@/components/results/ScoreCards";
import { ContentCards } from "@/components/results/ContentCards";
import { PreferencesCard } from "@/components/results/PreferencesCard";
import { ResumeData } from "@/types/resume";

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

        <ScoreCards data={data} scores={scores} />
        <ContentCards recommendations={scores.recommendations} />
        <PreferencesCard 
          sendToRecruiters={sendToRecruiters}
          consentToLinkedIn={consentToLinkedIn}
          showCompanies={showCompanies}
          refreshing={refreshing}
          onSendToRecruitersChange={setSendToRecruiters}
          onConsentToLinkedInChange={setConsentToLinkedIn}
          onShowCompaniesChange={setShowCompanies}
          onSubmit={handleSubmit}
          companies={companies}
          selectedCompanies={selectedCompanies}
          onCompanySelect={handleCompanySelect}
          onSendEmail={handleSendEmail}
        />
      </div>
    </div>
  );
};

export default Results;
