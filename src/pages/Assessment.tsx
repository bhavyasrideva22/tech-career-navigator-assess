
import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import ScenarioCard from "@/components/ScenarioCard";
import { useAssessment } from "@/contexts/AssessmentContext";

const Assessment: React.FC = () => {
  const navigate = useNavigate();
  const { 
    state, 
    submitResponse, 
    nextScenario, 
    previousScenario, 
    completeAssessment 
  } = useAssessment();
  
  const { 
    selectedDomain, 
    currentScenarioIndex, 
    scenarios, 
    responses 
  } = state;

  // Redirect if no domain is selected
  React.useEffect(() => {
    if (!selectedDomain) {
      navigate("/");
    }
  }, [selectedDomain, navigate]);

  if (!selectedDomain || scenarios.length === 0) {
    return null;
  }

  const currentScenario = scenarios[currentScenarioIndex];
  const userResponse = responses.find(
    (r) => r.scenarioId === currentScenario.id
  );
  
  const isLastScenario = currentScenarioIndex === scenarios.length - 1;

  const handleComplete = () => {
    completeAssessment();
    navigate("/results");
  };

  return (
    <AppLayout 
      showBackButton={true} 
      onBack={() => navigate("/")}
      title={`${
        selectedDomain === "ai" 
          ? "AI Project Management" 
          : selectedDomain === "servicenow" 
          ? "ServiceNow Implementation" 
          : "Salesforce Client Interaction"
      } Assessment`}
    >
      <ScenarioCard
        scenario={currentScenario}
        currentIndex={currentScenarioIndex}
        totalScenarios={scenarios.length}
        userResponse={userResponse}
        onSubmitResponse={submitResponse}
        onNext={nextScenario}
        onPrevious={previousScenario}
        onComplete={handleComplete}
        isLastScenario={isLastScenario}
      />
    </AppLayout>
  );
};

export default Assessment;
