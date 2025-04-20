
import { FileText, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface ContentCardsProps {
  recommendations: string[];
}

export const ContentCards = ({ recommendations }: ContentCardsProps) => {
  return (
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
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span>•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
