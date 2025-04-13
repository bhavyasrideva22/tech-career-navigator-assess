
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAssessment } from "@/contexts/AssessmentContext";
import { ArrowRight, BadgeCheck, RefreshCw, TrendingUp, Users, MessageSquare, ClipboardList } from "lucide-react";
import { Radar } from "recharts";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, } from "recharts";

const competencyLabels: Record<string, { name: string; description: string; icon: React.FC }> = {
  criticalThinking: {
    name: "Critical Thinking",
    description: "Ability to analyze problems and make sound decisions based on available information",
    icon: TrendingUp,
  },
  teamCollaboration: {
    name: "Team Collaboration",
    description: "Effectiveness in working with others and leveraging team strengths",
    icon: Users,
  },
  clientCommunication: {
    name: "Client Communication",
    description: "Skill in understanding client needs and communicating solutions effectively",
    icon: MessageSquare,
  },
  prioritization: {
    name: "Prioritization & Adaptability",
    description: "Capability to manage competing priorities and adapt to changing requirements",
    icon: ClipboardList,
  },
};

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { state, resetAssessment } = useAssessment();
  const { result } = state;

  if (!result) {
    navigate("/");
    return null;
  }

  const handleReset = () => {
    resetAssessment();
    navigate("/");
  };

  // Transform data for radar chart
  const radarData = result.competencyScores.map((item) => ({
    subject: competencyLabels[item.competency].name,
    score: item.maxScore > 0 ? (item.score / item.maxScore) * 100 : 0,
    fullMark: 100,
  }));

  // Calculate overall percentage
  const overallPercentage = Math.round(
    (result.totalScore / result.maxPossibleScore) * 100
  );

  return (
    <div className="flex flex-col items-center animate-fade-in max-w-4xl mx-auto">
      <Card className="w-full shadow-md mb-8">
        <CardHeader className="text-center bg-tech-blue/5 border-b">
          <CardTitle className="text-2xl text-tech-darkGray">
            Assessment Results
          </CardTitle>
          <CardDescription>
            Based on your responses to the tech scenarios
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-tech-blue/10 text-tech-blue mb-4">
              <span className="text-3xl font-bold">{overallPercentage}%</span>
            </div>
            <h2 className="text-xl font-semibold text-tech-darkGray mb-2 flex items-center justify-center gap-2">
              <BadgeCheck className="text-tech-green h-5 w-5" />
              {result.performanceLevel}
            </h2>
            <p className="text-tech-mediumGray">
              You've demonstrated proficiency in solving tech workplace scenarios
            </p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4 text-center">Competency Profile</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#1A1F2C' }} />
                  <PolarRadiusAxis domain={[0, 100]} tickCount={5} />
                  <Radar
                    name="Skills"
                    dataKey="score"
                    stroke="#0EA5E9"
                    fill="#0EA5E9"
                    fillOpacity={0.5}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-tech-green/5 border border-tech-green/20 rounded-lg p-5">
              <h3 className="text-lg font-medium text-tech-green mb-3 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Strengths
              </h3>
              <ul className="space-y-3">
                {result.strengths.map((strength) => (
                  <li key={strength} className="flex items-start gap-2">
                    <BadgeCheck className="h-5 w-5 text-tech-green mt-0.5" />
                    <div>
                      <h4 className="font-medium">{competencyLabels[strength].name}</h4>
                      <p className="text-sm text-tech-mediumGray">
                        {competencyLabels[strength].description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-tech-orange/5 border border-tech-orange/20 rounded-lg p-5">
              <h3 className="text-lg font-medium text-tech-orange mb-3 flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Growth Areas
              </h3>
              <ul className="space-y-3">
                {result.growthAreas.map((area) => (
                  <li key={area} className="flex items-start gap-2">
                    <TrendingUp className="h-5 w-5 text-tech-orange mt-0.5" />
                    <div>
                      <h4 className="font-medium">{competencyLabels[area].name}</h4>
                      <p className="text-sm text-tech-mediumGray">
                        {competencyLabels[area].description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8 space-y-4">
            <Button
              className="bg-tech-blue hover:bg-tech-blue/90 text-white"
              onClick={() => navigate("/feedback")}
            >
              View Detailed Feedback
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={handleReset}>
              Start a New Assessment
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
