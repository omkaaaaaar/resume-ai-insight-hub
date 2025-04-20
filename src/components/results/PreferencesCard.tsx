
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RefreshCw } from "lucide-react";
import { CompanySelection } from "./CompanySelection";

interface PreferencesCardProps {
  sendToRecruiters: boolean;
  consentToLinkedIn: boolean;
  showCompanies: boolean;
  refreshing: boolean;
  onSendToRecruitersChange: (checked: boolean) => void;
  onConsentToLinkedInChange: (checked: boolean) => void;
  onShowCompaniesChange: (checked: boolean) => void;
  onSubmit: () => void;
  companies: Array<{ name: string; location: string; role: string; }>;
  selectedCompanies: string[];
  onCompanySelect: (companyName: string) => void;
  onSendEmail: () => void;
}

export const PreferencesCard = ({
  sendToRecruiters,
  consentToLinkedIn,
  showCompanies,
  refreshing,
  onSendToRecruitersChange,
  onConsentToLinkedInChange,
  onShowCompaniesChange,
  onSubmit,
  companies,
  selectedCompanies,
  onCompanySelect,
  onSendEmail
}: PreferencesCardProps) => {
  return (
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
                onSendToRecruitersChange(checked);
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
                onConsentToLinkedInChange(checked);
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
                onShowCompaniesChange(checked);
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

        <CompanySelection 
          companies={companies}
          showCompanies={showCompanies}
          selectedCompanies={selectedCompanies}
          onCompanySelect={onCompanySelect}
          onSendEmail={onSendEmail}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit} disabled={refreshing}>
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
  );
};
