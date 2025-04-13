
import React, { createContext, useContext, useReducer } from "react";
import {
  AssessmentState,
  Domain,
  UserResponse,
  AssessmentResult,
  CompetencyScore,
  Competency,
} from "@/types/assessmentTypes";
import { getAssessmentScenarios } from "@/data/scenarios";

// Define initial state
const initialState: AssessmentState = {
  selectedDomain: null,
  currentScenarioIndex: 0,
  scenarios: [],
  responses: [],
  completed: false,
  result: null,
};

// Define action types
type AssessmentAction =
  | { type: "SELECT_DOMAIN"; domain: Domain }
  | { type: "NEXT_SCENARIO" }
  | { type: "PREVIOUS_SCENARIO" }
  | { type: "SUBMIT_RESPONSE"; response: UserResponse }
  | { type: "COMPLETE_ASSESSMENT"; result: AssessmentResult }
  | { type: "RESET_ASSESSMENT" };

// Create reducer
const assessmentReducer = (
  state: AssessmentState,
  action: AssessmentAction
): AssessmentState => {
  switch (action.type) {
    case "SELECT_DOMAIN":
      return {
        ...initialState,
        selectedDomain: action.domain,
        scenarios: getAssessmentScenarios(action.domain),
      };
    case "NEXT_SCENARIO":
      return {
        ...state,
        currentScenarioIndex: Math.min(
          state.currentScenarioIndex + 1,
          state.scenarios.length - 1
        ),
      };
    case "PREVIOUS_SCENARIO":
      return {
        ...state,
        currentScenarioIndex: Math.max(state.currentScenarioIndex - 1, 0),
      };
    case "SUBMIT_RESPONSE":
      // Update existing response or add new one
      const responseIndex = state.responses.findIndex(
        (r) => r.scenarioId === action.response.scenarioId
      );
      
      const updatedResponses = [...state.responses];
      if (responseIndex >= 0) {
        updatedResponses[responseIndex] = action.response;
      } else {
        updatedResponses.push(action.response);
      }
      
      return {
        ...state,
        responses: updatedResponses,
      };
    case "COMPLETE_ASSESSMENT":
      return {
        ...state,
        completed: true,
        result: action.result,
      };
    case "RESET_ASSESSMENT":
      return initialState;
    default:
      return state;
  }
};

// Create context
type AssessmentContextType = {
  state: AssessmentState;
  selectDomain: (domain: Domain) => void;
  nextScenario: () => void;
  previousScenario: () => void;
  submitResponse: (response: UserResponse) => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
};

const AssessmentContext = createContext<AssessmentContextType | undefined>(
  undefined
);

// Helper functions for scoring
const calculateCompetencyScores = (
  state: AssessmentState
): CompetencyScore[] => {
  // Initialize scores for each competency
  const competencies: Competency[] = [
    "criticalThinking",
    "teamCollaboration",
    "clientCommunication",
    "prioritization",
  ];
  
  const scores: Record<Competency, { score: number; maxScore: number }> = {} as Record<
    Competency,
    { score: number; maxScore: number }
  >;
  
  competencies.forEach((competency) => {
    scores[competency] = { score: 0, maxScore: 0 };
  });

  // Calculate scores based on responses
  state.responses.forEach((response) => {
    const scenario = state.scenarios.find((s) => s.id === response.scenarioId);
    if (!scenario) return;

    // Score for most effective option
    if (response.mostEffectiveId) {
      const option = scenario.options.find((o) => o.id === response.mostEffectiveId);
      if (option) {
        competencies.forEach((competency) => {
          scores[competency].score += option.competencies[competency];
        });
      }
    }

    // Penalty for least effective option (if not correctly identified)
    if (response.leastEffectiveId) {
      const option = scenario.options.find((o) => o.id === response.leastEffectiveId);
      const leastEffectiveOption = [...scenario.options].sort(
        (a, b) => a.effectiveness - b.effectiveness
      )[0];
      
      if (option && option.id !== leastEffectiveOption.id) {
        competencies.forEach((competency) => {
          scores[competency].score -= Math.abs(
            option.competencies[competency] - leastEffectiveOption.competencies[competency]
          );
        });
      }
    }

    // Calculate max possible scores
    const mostEffectiveOption = [...scenario.options].sort(
      (a, b) => b.effectiveness - a.effectiveness
    )[0];
    
    competencies.forEach((competency) => {
      scores[competency].maxScore += mostEffectiveOption.competencies[competency];
    });
  });

  // Ensure no negative scores
  competencies.forEach((competency) => {
    scores[competency].score = Math.max(0, scores[competency].score);
  });

  // Format as CompetencyScore array
  return competencies.map((competency) => ({
    competency,
    score: scores[competency].score,
    maxScore: scores[competency].maxScore,
  }));
};

const determinePerformanceLevel = (totalScore: number, maxScore: number): string => {
  const percentage = (totalScore / maxScore) * 100;
  
  if (percentage >= 90) return "Expert Tech Decision-Maker";
  if (percentage >= 75) return "Advanced Tech Decision-Maker";
  if (percentage >= 60) return "Proficient Tech Decision-Maker";
  if (percentage >= 40) return "Developing Tech Decision-Maker";
  return "Emerging Tech Decision-Maker";
};

// Context Provider
export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(assessmentReducer, initialState);

  const selectDomain = (domain: Domain) => {
    dispatch({ type: "SELECT_DOMAIN", domain });
  };

  const nextScenario = () => {
    dispatch({ type: "NEXT_SCENARIO" });
  };

  const previousScenario = () => {
    dispatch({ type: "PREVIOUS_SCENARIO" });
  };

  const submitResponse = (response: UserResponse) => {
    dispatch({ type: "SUBMIT_RESPONSE", response });
  };

  const completeAssessment = () => {
    // Calculate scores
    const competencyScores = calculateCompetencyScores(state);
    
    // Calculate total score
    const totalScore = competencyScores.reduce(
      (sum, item) => sum + item.score,
      0
    );
    const maxPossibleScore = competencyScores.reduce(
      (sum, item) => sum + item.maxScore,
      0
    );

    // Determine performance level
    const performanceLevel = determinePerformanceLevel(
      totalScore,
      maxPossibleScore
    );

    // Identify strengths and growth areas
    const normalizedScores = competencyScores.map((item) => ({
      ...item,
      normalizedScore: item.maxScore > 0 ? (item.score / item.maxScore) : 0,
    }));
    
    const sortedByScore = [...normalizedScores].sort(
      (a, b) => b.normalizedScore - a.normalizedScore
    );
    
    const strengths = sortedByScore
      .slice(0, 2)
      .map((item) => item.competency);
      
    const growthAreas = sortedByScore
      .slice(-2)
      .map((item) => item.competency);

    const result: AssessmentResult = {
      competencyScores,
      totalScore,
      maxPossibleScore,
      performanceLevel,
      strengths,
      growthAreas,
      responses: state.responses,
    };

    dispatch({ type: "COMPLETE_ASSESSMENT", result });
  };

  const resetAssessment = () => {
    dispatch({ type: "RESET_ASSESSMENT" });
  };

  return (
    <AssessmentContext.Provider
      value={{
        state,
        selectDomain,
        nextScenario,
        previousScenario,
        submitResponse,
        completeAssessment,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

// Custom hook
export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (context === undefined) {
    throw new Error("useAssessment must be used within an AssessmentProvider");
  }
  return context;
};
