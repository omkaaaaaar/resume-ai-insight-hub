
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, LogIn, LockKeyhole, UserCog } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [adminCredentials, setAdminCredentials] = useState({
    email: "",
    password: "",
  });

  const handleAdminInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminCredentials({
      ...adminCredentials,
      [name]: value,
    });
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEwIiwibmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNTE2MjM5MDIyfQ";
      
      localStorage.setItem("authToken", token);
      localStorage.setItem("userRole", "admin");
      
      toast({
        title: "Admin Login Successful",
        description: "Welcome back, Admin!",
        variant: "default",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "Login Failed",
        description: "Invalid admin credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild className="group">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </Button>
      </div>
      
      <Card className="w-full max-w-md border-0 shadow-lg bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight text-gradient-glow">ResumeLens.AI</CardTitle>
          <CardDescription>HR/Admin Portal</CardDescription>
        </CardHeader>
        
        <form onSubmit={handleAdminLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input
                id="admin-email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                required
                value={adminCredentials.email}
                onChange={handleAdminInputChange}
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="admin-password">Admin Password</Label>
                <Button variant="link" className="px-0 h-auto text-xs">
                  Forgot password?
                </Button>
              </div>
              <Input
                id="admin-password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                value={adminCredentials.password}
                onChange={handleAdminInputChange}
                className="bg-white/50 backdrop-blur-sm"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-violet-600 hover:from-primary/90 hover:to-violet-600/90 transition-all duration-300" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center">
                  <LockKeyhole className="mr-2 h-4 w-4 animate-pulse" />
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  <UserCog className="mr-2 h-4 w-4" />
                  Admin Sign In
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
