
export type Domain = "ai" | "servicenow" | "salesforce";

export type Competency = 
  | "criticalThinking" 
  | "teamCollaboration" 
  | "clientCommunication" 
  | "prioritization";

export interface CompetencyScore {
  competency: Competency;
  score: number;
  maxScore: number;
}

export interface Option {
  id: string;
  text: string;
  effectiveness: number; // 1-5 scale, 5 being most effective
  feedback: string;
  competencies: Record<Competency, number>; // How this option affects each competency score
}

export interface Scenario {
  id: string;
  domain: Domain;
  title: string;
  context: string;
  problem: string;
  options: Option[];
  image?: string; // Path to illustration
}

export interface UserResponse {
  scenarioId: string;
  mostEffectiveId: string | null;
  leastEffectiveId: string | null;
  timestamp: number;
}

export interface AssessmentResult {
  competencyScores: CompetencyScore[];
  totalScore: number;
  maxPossibleScore: number;
  performanceLevel: string;
  strengths: Competency[];
  growthAreas: Competency[];
  responses: UserResponse[];
}

export interface AssessmentState {
  selectedDomain: Domain | null;
  currentScenarioIndex: number;
  scenarios: Scenario[];
  responses: UserResponse[];
  completed: boolean;
  result: AssessmentResult | null;
}
