
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  
  return (
    <Button 
      variant="outline" 
      className="flex items-center gap-2 group transition-all hover:bg-background/80"
      onClick={() => navigate("/")}
    >
      <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
      Back to Home
    </Button>
  );
};

export default BackButton;
