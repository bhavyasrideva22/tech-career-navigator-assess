
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import Results from "@/components/Results";
import { useNavigate } from "react-router-dom";

const ResultsPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout 
      showBackButton={true} 
      onBack={() => navigate("/")}
      title="Assessment Results"
    >
      <Results />
    </AppLayout>
  );
};

export default ResultsPage;
