
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FormComponent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
  });
  
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validate file type
      if (file.type !== 'application/pdf') {
        setErrors({
          ...errors,
          resume: 'Please upload a PDF file'
        });
        return;
      }
      
      setResume(file);
      setFileUploadSuccess(true);
      setErrors({
        ...errors,
        resume: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    if (!formData.linkedin.trim()) {
      newErrors.linkedin = 'LinkedIn profile is required';
    }
    
    if (!formData.github.trim()) {
      newErrors.github = 'GitHub profile is required';
    }
    
    if (!resume) {
      newErrors.resume = 'Resume is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Form Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      
      if (resume) {
        formDataToSend.append('resume', resume);
      }
      
      // In a real application, this would send the data to your API
      // For now, we'll simulate a successful response with a delay
      
      setTimeout(() => {
        // Simulated successful response
        toast({
          title: "Success!",
          description: "Your resume has been submitted for analysis.",
          variant: "default"
        });
        
        // Store the form data in localStorage to access in the Results page
        localStorage.setItem('resumeData', JSON.stringify({
          ...formData,
          resumeText: "This is simulated parsed resume text since we can't actually upload files in this demo. In a real application, this would be the parsed text from your resume PDF."
        }));
        
        // Navigate to the results page
        navigate('/results');
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was an error submitting your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="fade-in text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-2">Resume Analyzer</h1>
          <p className="text-lg text-muted-foreground">
            Upload your resume and get professional feedback and insights
          </p>
        </div>
        
        <div className="bg-card shadow-custom rounded-xl p-8 mb-8 slide-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="johndoe@example.com"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  className={errors.phone ? "border-destructive" : ""}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.phone}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input 
                  id="linkedin"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/johndoe"
                  className={errors.linkedin ? "border-destructive" : ""}
                />
                {errors.linkedin && (
                  <p className="text-destructive text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.linkedin}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="github">GitHub Profile</Label>
                <Input 
                  id="github"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/johndoe"
                  className={errors.github ? "border-destructive" : ""}
                />
                {errors.github && (
                  <p className="text-destructive text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.github}
                  </p>
                )}
              </div>
              
              <div>
                <Label htmlFor="resume">Upload Resume (PDF)</Label>
                <div className="mt-1">
                  <label 
                    htmlFor="resume"
                    className={`flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md cursor-pointer hover:bg-secondary/50 transition-colors
                      ${errors.resume ? "border-destructive" : "border-input"}
                      ${fileUploadSuccess ? "bg-secondary/70" : ""}
                    `}
                  >
                    <div className="space-y-1 text-center">
                      {fileUploadSuccess ? (
                        <CheckCircle className="mx-auto h-12 w-12 text-primary" />
                      ) : (
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                      )}
                      <div className="flex text-sm">
                        <span className="relative rounded-md font-medium text-primary hover:text-primary-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-primary">
                          {fileUploadSuccess ? resume?.name : "Upload a file"}
                        </span>
                      </div>
                      {!fileUploadSuccess && (
                        <p className="text-xs text-muted-foreground">
                          PDF up to 10MB
                        </p>
                      )}
                    </div>
                  </label>
                  <input 
                    id="resume" 
                    name="resume" 
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </div>
                {errors.resume && (
                  <p className="text-destructive text-sm mt-1 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.resume}
                  </p>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing Resume...
                </>
              ) : (
                "Submit Resume"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormComponent;
