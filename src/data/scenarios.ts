
import { Scenario, Domain, Competency } from "@/types/assessmentTypes";

// Helper function to create competency impact objects
const createCompetencyImpact = (
  criticalThinking = 0,
  teamCollaboration = 0,
  clientCommunication = 0,
  prioritization = 0
): Record<Competency, number> => ({
  criticalThinking,
  teamCollaboration,
  clientCommunication,
  prioritization,
});

const AI_SCENARIOS: Scenario[] = [
  {
    id: "ai-1",
    domain: "ai",
    title: "Ethical AI Data Usage",
    context:
      "You're leading an AI project for a healthcare provider that involves analyzing patient data to predict treatment outcomes.",
    problem:
      "Your team discovers that the data contains unintended personal identifiers that weren't supposed to be included. The project deadline is in two days, and removing this data would require reprocessing everything, potentially delaying delivery.",
    options: [
      {
        id: "ai-1-a",
        text: "Continue using the data as is since the project is internal and the personal identifiers won't be exposed publicly.",
        effectiveness: 1,
        feedback:
          "This approach disregards data privacy regulations and ethical considerations, creating significant legal and reputational risks.",
        competencies: createCompetencyImpact(1, 0, 0, 1),
      },
      {
        id: "ai-1-b",
        text: "Inform the client immediately, explain the situation and propose a revised timeline with proper data processing.",
        effectiveness: 5,
        feedback:
          "This transparent approach prioritizes ethics and compliance while proactively managing client expectations about necessary timeline adjustments.",
        competencies: createCompetencyImpact(5, 3, 5, 4),
      },
      {
        id: "ai-1-c",
        text: "Quickly implement a basic anonymization layer before processing, then deliver on time with a note about potential data limitations.",
        effectiveness: 3,
        feedback:
          "While this attempts to balance timeline and ethics, a rushed anonymization approach may be insufficient for compliance and could create false confidence.",
        competencies: createCompetencyImpact(3, 2, 2, 3),
      },
      {
        id: "ai-1-d",
        text: "Ask your team to work overtime to clean the data properly while not informing the client about the issue.",
        effectiveness: 2,
        feedback:
          "While addressing the data issue, this option creates team burnout and lacks necessary transparency with the client about potential risks and challenges.",
        competencies: createCompetencyImpact(2, 1, 0, 2),
      },
    ],
    image: "/ai-scenario-1.svg",
  },
  {
    id: "ai-2",
    domain: "ai",
    title: "Model Performance Discrepancy",
    context:
      "Your team has developed a machine learning model for customer churn prediction that performed excellently in testing with 92% accuracy.",
    problem:
      "After three weeks in production, the client reports that the model's predictions don't match their business reality, with many false positives. Your initial investigation confirms the model is working as designed.",
    options: [
      {
        id: "ai-2-a",
        text: "Explain to the client that the model is statistically sound, and the issue must be with their interpretation of results or data quality.",
        effectiveness: 1,
        feedback:
          "This defensive response dismisses the client's valid business concerns and fails to investigate potential issues with model generalizability or concept drift.",
        competencies: createCompetencyImpact(1, 0, 0, 1),
      },
      {
        id: "ai-2-b",
        text: "Schedule a workshop with the client's business experts to understand their observations, review prediction examples, and identify potential gaps between testing and production environments.",
        effectiveness: 5,
        feedback:
          "This collaborative approach acknowledges the client's concerns while establishing a framework to diagnose real-world model performance issues systematically.",
        competencies: createCompetencyImpact(5, 4, 5, 4),
      },
      {
        id: "ai-2-c",
        text: "Offer to retrain the model immediately with new production data to improve its performance.",
        effectiveness: 3,
        feedback:
          "While action-oriented, this solution jumps to implementation before properly diagnosing the root cause, which might waste resources if the issue lies elsewhere.",
        competencies: createCompetencyImpact(2, 3, 2, 3),
      },
      {
        id: "ai-2-d",
        text: "Ask the client to provide detailed documentation of all the cases where the model failed, then investigate each individually.",
        effectiveness: 2,
        feedback:
          "This puts the burden on the client and focuses on individual cases rather than systemic patterns, potentially missing larger issues with the model's design or assumptions.",
        competencies: createCompetencyImpact(3, 1, 1, 2),
      },
    ],
    image: "/ai-scenario-2.svg",
  },
];

const SERVICENOW_SCENARIOS: Scenario[] = [
  {
    id: "servicenow-1",
    domain: "servicenow",
    title: "Implementation Scope Creep",
    context:
      "You're three weeks into a ServiceNow ITSM implementation for a mid-sized manufacturing company.",
    problem:
      "During a demo, the client's CIO asks for additional custom workflows for their specialized manufacturing processes, which weren't in the original scope. These would require significant development time.",
    options: [
      {
        id: "sn-1-a",
        text: "Agree to include all requested features to maintain a good client relationship, knowing your team will need to work overtime.",
        effectiveness: 1,
        feedback:
          "This creates unrealistic expectations, risks team burnout, project quality, and timeline without addressing the commercial impact of scope changes.",
        competencies: createCompetencyImpact(1, 1, 2, 0),
      },
      {
        id: "sn-1-b",
        text: "Acknowledge the requests and schedule a follow-up meeting to review the impact on timeline, resources, and budget, then present options for a potential phase 2.",
        effectiveness: 5,
        feedback:
          "This maintains client partnership while establishing proper scope management processes, allowing for informed decisions about priorities, resources, and commercial considerations.",
        competencies: createCompetencyImpact(5, 4, 5, 5),
      },
      {
        id: "sn-1-c",
        text: "Explain that these features are out of scope and cannot be accommodated in the current project timeline or budget.",
        effectiveness: 2,
        feedback:
          "While technically correct about scope boundaries, this rigid response fails to explore alternatives or understand the client's underlying business needs.",
        competencies: createCompetencyImpact(2, 1, 1, 3),
      },
      {
        id: "sn-1-d",
        text: "Suggest implementing a simplified version of the requested features using out-of-box configuration rather than custom development.",
        effectiveness: 3,
        feedback:
          "This solution-oriented approach attempts compromise but makes assumptions about requirements without proper analysis of business needs or impact.",
        competencies: createCompetencyImpact(3, 3, 3, 3),
      },
    ],
    image: "/servicenow-scenario-1.svg",
  },
  {
    id: "servicenow-2",
    domain: "servicenow",
    title: "Data Migration Challenge",
    context:
      "You're implementing ServiceNow CMDB for a large financial institution that needs to migrate data from multiple legacy systems.",
    problem:
      "Two weeks before go-live, you discover that 30% of the data from the main legacy system contains inconsistencies that will cause relationship mapping problems in ServiceNow.",
    options: [
      {
        id: "sn-2-a",
        text: "Delay the go-live date by one month to properly cleanse and map all the data.",
        effectiveness: 3,
        feedback:
          "While ensuring data quality, this option immediately jumps to a significant delay without exploring intermediate solutions or client priorities.",
        competencies: createCompetencyImpact(3, 2, 2, 3),
      },
      {
        id: "sn-2-b",
        text: "Proceed with the launch using only the 70% clean data, then address the problematic records afterward.",
        effectiveness: 2,
        feedback:
          "This risks system integrity and user experience, potentially creating more work later to fix relationship inconsistencies and data trust issues.",
        competencies: createCompetencyImpact(1, 2, 1, 2),
      },
      {
        id: "sn-2-c",
        text: "Meet with the client stakeholders to present the issue, its implications, and a range of options with associated tradeoffs between time, data completeness, and system integrity.",
        effectiveness: 5,
        feedback:
          "This transparent approach brings the client into decision-making with full information, balancing technical considerations with business priorities.",
        competencies: createCompetencyImpact(5, 4, 5, 4),
      },
      {
        id: "sn-2-d",
        text: "Have your team work nights and weekends to manually fix the data issues without informing the client of the problem.",
        effectiveness: 1,
        feedback:
          "This non-transparent approach creates team burnout, quality risks from rushed work, and misses an opportunity to address root causes of data issues.",
        competencies: createCompetencyImpact(1, 0, 0, 2),
      },
    ],
    image: "/servicenow-scenario-2.svg",
  },
];

const SALESFORCE_SCENARIOS: Scenario[] = [
  {
    id: "salesforce-1",
    domain: "salesforce",
    title: "Unclear Requirements",
    context:
      "You're configuring a Salesforce Sales Cloud implementation for a retail client who wants to track in-store customer interactions.",
    problem:
      "The stakeholders from different departments disagree about what fields and processes are needed. The marketing team wants detailed customer journey tracking, while sales managers want a streamlined quick-entry process for associates.",
    options: [
      {
        id: "sf-1-a",
        text: "Implement all requested fields and make them all required to ensure complete data.",
        effectiveness: 1,
        feedback:
          "This creates a burdensome user experience that satisfies neither team's core needs and will likely lead to poor adoption and data quality.",
        competencies: createCompetencyImpact(1, 1, 1, 1),
      },
      {
        id: "sf-1-b",
        text: "Side with the sales managers since they'll be the primary system users.",
        effectiveness: 2,
        feedback:
          "While acknowledging user experience importance, this fails to address valid marketing requirements and organizational alignment needs.",
        competencies: createCompetencyImpact(2, 1, 2, 2),
      },
      {
        id: "sf-1-c",
        text: "Facilitate a workshop with both departments to map the customer journey, identify core vs. nice-to-have fields, and design a tiered data entry approach with required, recommended, and optional fields.",
        effectiveness: 5,
        feedback:
          "This collaborative approach aligns stakeholders around shared goals while designing a solution that balances comprehensive data with usability.",
        competencies: createCompetencyImpact(5, 5, 5, 4),
      },
      {
        id: "sf-1-d",
        text: "Escalate to the client's executive sponsor to make the final decision on whose requirements take priority.",
        effectiveness: 3,
        feedback:
          "While seeking resolution, this option prematurely escalates before attempting collaborative problem-solving and risks creating internal tension.",
        competencies: createCompetencyImpact(2, 2, 3, 3),
      },
    ],
    image: "/salesforce-scenario-1.svg",
  },
  {
    id: "salesforce-2",
    domain: "salesforce",
    title: "Integration Failure",
    context:
      "You've implemented Salesforce CPQ for a telecommunications company, integrated with their legacy billing system.",
    problem:
      "During testing, you discover that 15% of quotes fail when pushed to the billing system. The client is frustrated because they've already extended the go-live date twice, and business users are eager to start using the system.",
    options: [
      {
        id: "sf-2-a",
        text: "Implement a manual workaround where failed quotes are flagged for manual processing by the billing team.",
        effectiveness: 2,
        feedback:
          "This creates an inefficient process that doesn't address root causes and risks scaling problems as volume increases.",
        competencies: createCompetencyImpact(1, 2, 2, 3),
      },
      {
        id: "sf-2-b",
        text: "Launch on schedule, explaining that the 15% failure rate is within acceptable parameters for a new integration.",
        effectiveness: 1,
        feedback:
          "This dismisses a significant failure rate that will directly impact customer experience and billing accuracy, creating business risk.",
        competencies: createCompetencyImpact(0, 1, 0, 1),
      },
      {
        id: "sf-2-c",
        text: "Analyze the patterns in the failing quotes, identify common factors, and develop targeted fixes for those specific scenarios while proceeding with implementation for the working cases.",
        effectiveness: 4,
        feedback:
          "This balanced approach addresses critical issues while allowing progress, though it would be stronger with more client communication.",
        competencies: createCompetencyImpact(4, 3, 3, 4),
      },
      {
        id: "sf-2-d",
        text: "Present the client with a detailed analysis of the failing scenarios, a plan for fixing top issues, options for temporary workarounds, and recommended phased go-live with clearly defined success criteria.",
        effectiveness: 5,
        feedback:
          "This comprehensive approach combines problem-solving with transparent client communication and structured decision-making.",
        competencies: createCompetencyImpact(5, 4, 5, 5),
      },
    ],
    image: "/salesforce-scenario-2.svg",
  },
];

// Combine all scenarios for export
export const ALL_SCENARIOS: Record<Domain, Scenario[]> = {
  ai: AI_SCENARIOS,
  servicenow: SERVICENOW_SCENARIOS,
  salesforce: SALESFORCE_SCENARIOS,
};

// Get random scenarios from a domain
export const getRandomScenarios = (domain: Domain, count: number = 3): Scenario[] => {
  const domainScenarios = ALL_SCENARIOS[domain];
  // Shuffle array and take the first 'count' items
  return [...domainScenarios]
    .sort(() => 0.5 - Math.random())
    .slice(0, Math.min(count, domainScenarios.length));
};

// Get scenarios for the assessment
export const getAssessmentScenarios = (domain: Domain): Scenario[] => {
  return ALL_SCENARIOS[domain];
};
