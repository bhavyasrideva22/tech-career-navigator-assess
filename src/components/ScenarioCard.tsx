
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Option, Scenario, UserResponse } from "@/types/assessmentTypes";
import { CheckCircle, XCircle, ChevronRight, ChevronLeft } from "lucide-react";

interface ScenarioCardProps {
  scenario: Scenario;
  currentIndex: number;
  totalScenarios: number;
  userResponse: UserResponse | undefined;
  onSubmitResponse: (response: UserResponse) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
  isLastScenario: boolean;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({
  scenario,
  currentIndex,
  totalScenarios,
  userResponse,
  onSubmitResponse,
  onNext,
  onPrevious,
  onComplete,
  isLastScenario,
}) => {
  const [mostEffectiveId, setMostEffectiveId] = useState<string | null>(
    userResponse?.mostEffectiveId || null
  );
  const [leastEffectiveId, setLeastEffectiveId] = useState<string | null>(
    userResponse?.leastEffectiveId || null
  );

  const handleSubmit = () => {
    const response: UserResponse = {
      scenarioId: scenario.id,
      mostEffectiveId,
      leastEffectiveId,
      timestamp: Date.now(),
    };
    
    onSubmitResponse(response);
    
    if (isLastScenario) {
      onComplete();
    } else {
      onNext();
    }
  };

  const isSubmitDisabled = !mostEffectiveId || !leastEffectiveId;

  return (
    <Card className="w-full max-w-4xl mx-auto animate-fade-in shadow-md">
      <CardHeader className="bg-tech-lightGray border-b pb-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-tech-mediumGray">
            Scenario {currentIndex + 1} of {totalScenarios}
          </div>
          <div className="w-48 h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-tech-blue rounded-full"
              style={{
                width: `${((currentIndex + 1) / totalScenarios) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        <CardTitle className="text-xl text-tech-darkGray">{scenario.title}</CardTitle>
        <CardDescription className="text-tech-mediumGray">
          {scenario.domain === "ai" && "AI Project Management"}
          {scenario.domain === "servicenow" && "ServiceNow Implementation"}
          {scenario.domain === "salesforce" && "Salesforce Client Interaction"}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-tech-darkGray mb-2">Context</h3>
          <p className="text-tech-mediumGray">{scenario.context}</p>
        </div>
        
        <div className="mb-8">
          <h3 className="text-lg font-medium text-tech-darkGray mb-2">Challenge</h3>
          <p className="text-tech-mediumGray">{scenario.problem}</p>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-tech-darkGray mb-4">
              Which option do you think is MOST effective?
            </h3>
            <RadioGroup
              value={mostEffectiveId || ""}
              onValueChange={setMostEffectiveId}
              className="space-y-3"
            >
              {scenario.options.map((option) => (
                <div
                  key={`most-${option.id}`}
                  className={`flex items-start space-x-2 rounded-md border p-4 ${
                    mostEffectiveId === option.id ? "border-tech-blue bg-tech-blue/5" : ""
                  }`}
                >
                  <RadioGroupItem value={option.id} id={`most-${option.id}`} className="mt-1" />
                  <Label
                    htmlFor={`most-${option.id}`}
                    className="flex-1 text-base font-normal cursor-pointer"
                  >
                    {option.text}
                  </Label>
                  {mostEffectiveId === option.id && (
                    <CheckCircle className="h-5 w-5 text-tech-blue" />
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-tech-darkGray mb-4">
              Which option do you think is LEAST effective?
            </h3>
            <RadioGroup
              value={leastEffectiveId || ""}
              onValueChange={setLeastEffectiveId}
              className="space-y-3"
            >
              {scenario.options.map((option) => (
                <div
                  key={`least-${option.id}`}
                  className={`flex items-start space-x-2 rounded-md border p-4 ${
                    leastEffectiveId === option.id ? "border-red-400 bg-red-50" : ""
                  }`}
                >
                  <RadioGroupItem value={option.id} id={`least-${option.id}`} className="mt-1" />
                  <Label
                    htmlFor={`least-${option.id}`}
                    className="flex-1 text-base font-normal cursor-pointer"
                  >
                    {option.text}
                  </Label>
                  {leastEffectiveId === option.id && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between pt-4 border-t">
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={currentIndex === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        
        <Button
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="bg-tech-blue hover:bg-tech-blue/90 text-white"
        >
          {isLastScenario ? "Complete Assessment" : (
            <>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScenarioCard;
