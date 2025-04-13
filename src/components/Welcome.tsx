
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Domain } from "@/types/assessmentTypes";
import { useAssessment } from "@/contexts/AssessmentContext";
import { BrainCircuit, CloudCog, LineChart } from "lucide-react";

const domainInfo = [
  {
    id: "ai" as Domain,
    title: "AI Project Management",
    description: "Navigate ethical considerations, stakeholder management, and technical challenges in AI implementations.",
    icon: BrainCircuit,
  },
  {
    id: "servicenow" as Domain,
    title: "ServiceNow Implementation",
    description: "Handle scope, integration challenges, and cross-functional requirements in ServiceNow projects.",
    icon: CloudCog,
  },
  {
    id: "salesforce" as Domain,
    title: "Salesforce Client Interactions",
    description: "Manage client expectations, requirements gathering, and solution design in Salesforce engagements.",
    icon: LineChart,
  },
];

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const { selectDomain } = useAssessment();

  const handleSelectDomain = (domain: Domain) => {
    selectDomain(domain);
    navigate("/assessment");
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-tech-darkGray mb-4">
          Tech Scenario Solver
        </h1>
        <p className="text-lg text-tech-mediumGray mb-6">
          Test your decision-making skills in realistic tech workplace scenarios.
          Choose a specialization track to begin your assessment.
        </p>
        <div className="border-b border-gray-200 w-20 mx-auto mb-10"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {domainInfo.map((domain) => (
          <Card key={domain.id} className="bg-white hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-tech-darkGray">
                <domain.icon className="h-6 w-6 text-tech-blue" />
                {domain.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-tech-mediumGray mb-6 min-h-[80px]">
                {domain.description}
              </CardDescription>
              <Button 
                className="w-full bg-tech-blue hover:bg-tech-blue/90 text-white"
                onClick={() => handleSelectDomain(domain.id)}
              >
                Start This Track
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-tech-darkGray mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div>
            <div className="bg-tech-blue/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
              <span className="text-tech-blue font-semibold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Evaluate Scenarios</h3>
            <p className="text-tech-mediumGray">
              You'll be presented with realistic workplace challenges from your chosen domain.
            </p>
          </div>
          
          <div>
            <div className="bg-tech-blue/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
              <span className="text-tech-blue font-semibold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Make Decisions</h3>
            <p className="text-tech-mediumGray">
              For each scenario, select what you believe is the most and least effective response.
            </p>
          </div>
          
          <div>
            <div className="bg-tech-blue/10 rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
              <span className="text-tech-blue font-semibold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Get Feedback</h3>
            <p className="text-tech-mediumGray">
              Receive personalized insights into your decision-making strengths and growth areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
