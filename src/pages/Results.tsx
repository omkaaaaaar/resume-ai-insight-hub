
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ResumeData {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  resumeText: string;
}

const Results = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [sendToRecruiters, setSendToRecruiters] = useState(false);
  const [linkedInConsent, setLinkedInConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // In a real application, we would fetch data from the API here
    // For this demo, we'll use the data from localStorage
    const fetchData = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const storedData = localStorage.getItem('resumeData');
        if (storedData) {
          setResumeData(JSON.parse(storedData));
        } else {
          // If no data is found, redirect to the form
          toast({
            title: "No resume data found",
            description: "Please submit your resume first.",
            variant: "destructive"
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load resume data. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [navigate, toast]);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // In a real application, this would send the preferences to your API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Preferences Saved",
        description: `Your preferences have been updated. ${sendToRecruiters ? "Your resume will be shared with recruiters." : "Your resume will not be shared with recruiters."} ${linkedInConsent ? "LinkedIn evaluation is enabled." : "LinkedIn evaluation is disabled."}`,
      });
      
      // Refresh the page by refetching data
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoading(false);
      
    } catch (error) {
      console.error('Error submitting preferences:', error);
      toast({
        title: "Error",
        description: "Failed to save preferences. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg">Loading resume data...</p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Form
        </Button>
        
        <div className="fade-in text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Resume Analysis Results</h1>
          <p className="text-lg text-muted-foreground">
            Review your resume insights and set your preferences
          </p>
        </div>
        
        {resumeData && (
          <div className="space-y-6">
            <div className="bg-card shadow-custom rounded-xl p-8 slide-in">
              <h2 className="text-2xl font-semibold mb-4">Resume Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-primary mb-2">Personal Information</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {resumeData.name}</p>
                    <p><span className="font-medium">Email:</span> {resumeData.email}</p>
                    <p><span className="font-medium">Phone:</span> {resumeData.phone}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary mb-2">Online Profiles</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <span className="font-medium mr-2">LinkedIn:</span>
                      <a 
                        href={resumeData.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {resumeData.linkedin.replace(/^https?:\/\/(www\.)?/i, '')}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">GitHub:</span>
                      <a 
                        href={resumeData.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline flex items-center"
                      >
                        {resumeData.github.replace(/^https?:\/\/(www\.)?/i, '')}
                        <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div>
                <h3 className="text-lg font-medium text-primary mb-4">Parsed Resume Text</h3>
                <div className="bg-secondary/50 p-4 rounded-md h-48 overflow-y-auto">
                  <p className="whitespace-pre-line">{resumeData.resumeText}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card shadow-custom rounded-xl p-8 slide-in">
              <h2 className="text-2xl font-semibold mb-4">AI Resume Analysis</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Key Strengths</h3>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Strong technical skills demonstrated through GitHub projects</li>
                    <li>Clear and concise presentation of experience</li>
                    <li>Good balance of technical and soft skills</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">Improvement Areas</h3>
                  <ul className="list-disc list-inside space-y-2 ml-2">
                    <li>Add more quantifiable achievements to highlight impact</li>
                    <li>Consider reorganizing sections to emphasize most relevant experience</li>
                    <li>Include more industry-specific keywords to improve ATS compatibility</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-primary mb-3">ATS Compatibility Score</h3>
                  <div className="relative h-4 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-primary" style={{ width: '78%' }}></div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">Your resume is 78% compatible with common ATS systems</p>
                </div>
              </div>
            </div>
            
            <div className="bg-card shadow-custom rounded-xl p-8 slide-in">
              <h2 className="text-2xl font-semibold mb-6">Preferences</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="send-to-recruiters"
                    checked={sendToRecruiters}
                    onCheckedChange={(checked) => setSendToRecruiters(checked as boolean)}
                  />
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor="send-to-recruiters"
                      className="text-base font-medium cursor-pointer"
                    >
                      Share resume with job recruiters
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow us to share your resume with our network of vetted recruiters in your field
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="linkedin-consent"
                    checked={linkedInConsent}
                    onCheckedChange={(checked) => setLinkedInConsent(checked as boolean)}
                  />
                  <div className="space-y-1 leading-none">
                    <Label
                      htmlFor="linkedin-consent"
                      className="text-base font-medium cursor-pointer"
                    >
                      Evaluate LinkedIn profile
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow our AI to analyze your LinkedIn profile for additional optimization insights
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={handleSubmit} 
                className="mt-6 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving preferences...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Save Preferences
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Results;
