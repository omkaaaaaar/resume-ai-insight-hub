
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Company {
  name: string;
  location: string;
  role: string;
}

interface CompanySelectionProps {
  companies: Company[];
  showCompanies: boolean;
  onCompanySelect: (companyName: string) => void;
  selectedCompanies: string[];
  onSendEmail: () => void;
}

export const CompanySelection = ({
  companies,
  showCompanies,
  onCompanySelect,
  selectedCompanies,
  onSendEmail
}: CompanySelectionProps) => {
  if (!showCompanies) return null;

  return (
    <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
      <h4 className="font-medium mb-3">Available Companies</h4>
      <div className="space-y-3">
        {companies.map((company) => (
          <div key={company.name} className="flex items-center space-x-2">
            <Checkbox 
              id={`company-${company.name}`}
              checked={selectedCompanies.includes(company.name)}
              onCheckedChange={() => onCompanySelect(company.name)}
            />
            <label htmlFor={`company-${company.name}`} className="text-sm">
              {company.name} – {company.location} ({company.role})
            </label>
          </div>
        ))}
      </div>
      <Button 
        className="mt-4"
        onClick={onSendEmail}
        disabled={selectedCompanies.length === 0}
      >
        <Mail className="mr-2 h-4 w-4" />
        Send Resume
      </Button>
    </div>
  );
};
