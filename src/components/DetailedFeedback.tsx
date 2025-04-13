
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAssessment } from "@/contexts/AssessmentContext";
import { ArrowLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const DetailedFeedback: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAssessment();
  const { scenarios, responses, result } = state;

  if (!result) {
    navigate("/");
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-tech-darkGray">Detailed Feedback</h1>
        <Button variant="ghost" onClick={() => navigate("/results")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results
        </Button>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {scenarios.map((scenario) => {
          const response = responses.find((r) => r.scenarioId === scenario.id);
          
          if (!response) return null;
          
          const mostEffectiveOption = scenario.options.find(
            (o) => o.id === response.mostEffectiveId
          );
          
          const leastEffectiveOption = scenario.options.find(
            (o) => o.id === response.leastEffectiveId
          );
          
          const actualBestOption = [...scenario.options].sort(
            (a, b) => b.effectiveness - a.effectiveness
          )[0];
          
          const actualWorstOption = [...scenario.options].sort(
            (a, b) => a.effectiveness - b.effectiveness
          )[0];
          
          const mostCorrect = mostEffectiveOption?.id === actualBestOption.id;
          const leastCorrect = leastEffectiveOption?.id === actualWorstOption.id;

          return (
            <AccordionItem key={scenario.id} value={scenario.id} className="border rounded-lg overflow-hidden">
              <AccordionTrigger className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center gap-3 text-left">
                  {mostCorrect && leastCorrect ? (
                    <CheckCircle className="h-5 w-5 text-tech-green" />
                  ) : !mostCorrect && !leastCorrect ? (
                    <XCircle className="h-5 w-5 text-red-500" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-tech-orange" />
                  )}
                  <div>
                    <span className="font-medium text-lg">{scenario.title}</span>
                    <span className="text-tech-mediumGray text-sm ml-2">
                      ({scenario.domain === "ai" ? "AI Project Management" : 
                        scenario.domain === "servicenow" ? "ServiceNow Implementation" : 
                        "Salesforce Client Interaction"})
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              
              <AccordionContent>
                <CardContent className="px-6 py-4 border-t">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-tech-mediumGray">Context</h3>
                    <p className="mt-1">{scenario.context}</p>
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-tech-mediumGray">Challenge</h3>
                    <p className="mt-1">{scenario.problem}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card>
                      <CardHeader className="py-3 px-4 bg-gray-50">
                        <CardTitle className="text-base">Your Choice: Most Effective</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                          {mostCorrect ? (
                            <CheckCircle className="h-5 w-5 text-tech-green mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium">{mostEffectiveOption?.text}</p>
                            <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm">
                              <h4 className="font-medium mb-1">Feedback:</h4>
                              <p>{mostEffectiveOption?.feedback}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="py-3 px-4 bg-gray-50">
                        <CardTitle className="text-base">Your Choice: Least Effective</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-2">
                          {leastCorrect ? (
                            <CheckCircle className="h-5 w-5 text-tech-green mt-0.5" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                          )}
                          <div>
                            <p className="font-medium">{leastEffectiveOption?.text}</p>
                            <div className="mt-3 p-3 bg-gray-50 rounded-md text-sm">
                              <h4 className="font-medium mb-1">Feedback:</h4>
                              <p>{leastEffectiveOption?.feedback}</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {(!mostCorrect || !leastCorrect) && (
                    <div className="mt-6 p-4 bg-tech-blue/5 rounded-lg border border-tech-blue/20">
                      <h3 className="font-medium text-tech-blue mb-2">Expert Insight</h3>
                      {!mostCorrect && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium">Most Effective Approach:</h4>
                          <div className="flex items-start gap-2 mt-2">
                            <CheckCircle className="h-5 w-5 text-tech-green mt-0.5" />
                            <div>
                              <p>{actualBestOption.text}</p>
                              <p className="text-sm text-tech-mediumGray mt-1">
                                {actualBestOption.feedback}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {!leastCorrect && (
                        <div>
                          <h4 className="text-sm font-medium">Least Effective Approach:</h4>
                          <div className="flex items-start gap-2 mt-2">
                            <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                            <div>
                              <p>{actualWorstOption.text}</p>
                              <p className="text-sm text-tech-mediumGray mt-1">
                                {actualWorstOption.feedback}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
      
      <div className="flex justify-center mt-8">
        <Button 
          className="bg-tech-blue hover:bg-tech-blue/90 text-white"
          onClick={() => navigate("/results")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Results Summary
        </Button>
      </div>
    </div>
  );
};

export default DetailedFeedback;
