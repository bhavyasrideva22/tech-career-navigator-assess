
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import DetailedFeedback from "@/components/DetailedFeedback";
import { useNavigate } from "react-router-dom";

const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <AppLayout 
      showBackButton={true} 
      onBack={() => navigate("/results")}
      title="Detailed Feedback"
    >
      <DetailedFeedback />
    </AppLayout>
  );
};

export default FeedbackPage;
