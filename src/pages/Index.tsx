import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Building2, ArrowRight } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="text-center space-y-8 animate-fade-in p-8">
        <div className="flex justify-center mb-6">
          <div className="p-6 bg-primary/10 rounded-full animate-scale-in">
            <Building2 className="h-20 w-20 text-primary" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-foreground mb-4">
          Welcome to <span className="text-primary">genx</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Your complete real estate management solution. Manage properties, track listings, and organize master data all in one place.
        </p>
        <Button size="lg" onClick={() => navigate("/auth")} className="mt-8">
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
