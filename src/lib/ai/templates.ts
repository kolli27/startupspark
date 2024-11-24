import { BusinessIdea, FollowUpQuestion, ActionableSuggestions, MarketInsights } from './types'

export const responseTemplates = {
  businessIdea: `
Business Idea: {name}
==================
Description:
{description}

Target Market:
{targetMarket}

Market Size:
{marketSize}

Required Skills:
{skills}

Initial Investment:
{investment}

Time to Market:
{timeToMarket}

Competitive Advantage:
{competitiveAdvantage}

Potential Challenges:
{challenges}

First Steps:
{steps}

Success Metrics:
{metrics}

Market Validation:
{validation}

Scalability Potential:
{scalabilityPotential}

Technical Requirements:
{techRequirements}

Regulatory Considerations:
{regulatoryConsiderations}

---
`.trim(),

  followUpQuestion: `
Follow-up Question {number}
=======================
Question: {question}
Category: {category}
Priority: {priority}

Importance:
{importance}

Context:
{context}

Expected Insights:
{insights}

Related Topics:
{relatedTopics}

Potential Answers:
{potentialAnswers}

---
`.trim(),

  actionableSuggestions: `
Actionable Plan
==============

Immediate Next Steps (30 Days):
{immediate_next_steps}

Skill Development Plan:
{skill_development}

Networking Strategy:
{networking_strategy}

Resource Allocation:
{resource_allocation}

Cost Breakdown:
{cost_breakdown}

Resource Requirements:
{resource_requirements}

Implementation Timeline:
{implementation_timeline}

Milestone Tracking:
{milestone_tracking}

Potential Pitfalls:
{potential_pitfalls}

Risk Mitigation:
{risk_mitigation}

Contingency Plans:
{contingency_plans}

Success Indicators:
{success_indicators}

---
`.trim(),

  marketInsights: `
Market Analysis
==============

Current Market Trends:
{current_trends}

Market Size Analysis:
{market_size_analysis}

Market Gaps:
{market_gaps}

Competitive Landscape:
{competitive_landscape}

Customer Segments:
{customer_segments}

Target Customers:
{target_customers}

Revenue Potential:
{revenue_potential}

Pricing Strategy:
{pricing_strategy}

Distribution Channels:
{distribution_channels}

Entry Strategy:
{entry_strategy}

Growth Opportunities:
{growth_opportunities}

Market Risks:
{market_risks}

Regulatory Environment:
{regulatory_environment}

Technology Trends:
{technology_trends}

---
`.trim()
}

export const systemPrompts = {
  businessIdea: `You are an experienced startup advisor with expertise in business ideation and market analysis. Your task is to generate detailed, actionable business ideas based on the user's background and preferences. Focus on:
- Practical and implementable ideas
- Clear market opportunities
- Realistic resource requirements
- Specific success metrics
- Actionable first steps
Format your response exactly according to the template provided.`,

  followUpQuestion: `You are a business consultant specializing in due diligence and strategic planning. Your task is to generate insightful follow-up questions that will help uncover critical aspects of the business opportunity. Focus on:
- Strategic implications
- Risk assessment
- Market validation
- Resource optimization
Format your response exactly according to the template provided.`,

  actionableSuggestions: `You are a startup mentor with experience in helping entrepreneurs execute their business plans. Your task is to provide detailed, actionable suggestions that will help turn ideas into reality. Focus on:
- Concrete, time-bound actions
- Resource optimization
- Risk management
- Success metrics
Format your response exactly according to the template provided.`,

  marketInsights: `You are a market research analyst with expertise in identifying market opportunities and trends. Your task is to provide comprehensive market insights that will help inform business strategy. Focus on:
- Data-driven analysis
- Market dynamics
- Competitive positioning
- Growth opportunities
Format your response exactly according to the template provided.`
}

export const formatResponse = (template: string, data: Record<string, string | string[] | number>): string => {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    const placeholder = `{${key}}`;
    if (result.includes(placeholder)) {
      if (Array.isArray(value)) {
        result = result.replace(placeholder, value.map(v => `- ${v}`).join('\n'));
      } else {
        result = result.replace(placeholder, String(value));
      }
    }
  }
  return result.trim();
}

export function parseAIResponse(response: string, type: 'ideas'): BusinessIdea[];
export function parseAIResponse(response: string, type: 'questions'): FollowUpQuestion[];
export function parseAIResponse(response: string, type: 'suggestions'): ActionableSuggestions;
export function parseAIResponse(response: string, type: 'insights'): MarketInsights;
export function parseAIResponse(
  response: string,
  type: 'ideas' | 'questions' | 'suggestions' | 'insights'
): BusinessIdea[] | FollowUpQuestion[] | ActionableSuggestions | MarketInsights {
  try {
    switch (type) {
      case 'ideas':
        return parseBusinessIdeas(response);
      case 'questions':
        return parseFollowUpQuestions(response);
      case 'suggestions':
        return parseActionableSuggestions(response);
      case 'insights':
        return parseMarketInsights(response);
    }
  } catch (error) {
    console.error(`Error parsing AI response for type ${type}:`, error);
    throw new Error(`Failed to parse AI response for type ${type}`);
  }
}

function parseBusinessIdeas(response: string): BusinessIdea[] {
  const ideas = response.split('Business Idea:').filter(Boolean);
  return ideas.map(idea => {
    const sections = idea.split('\n\n');
    const parsedIdea: BusinessIdea = {
      name: '',
      description: '',
      targetMarket: '',
      skills: '',
      investment: '',
      challenges: '',
      steps: '',
      metrics: '',
      validation: '',
      marketSize: '',
      competitiveAdvantage: '',
      timeToMarket: '',
      scalabilityPotential: '',
      techRequirements: '',
      regulatoryConsiderations: ''
    };

    sections.forEach(section => {
      const [header, ...content] = section.split('\n');
      const contentText = content.join('\n').trim();

      const key = header.trim().toLowerCase()
        .replace(/[:\s-]+/g, '')
        .replace('market', 'marketSize')
        .replace('technical', 'tech')
        .replace('requirements', 'Requirements')
        .replace('competitive', 'competitiveAdvantage')
        .replace('time', 'timeToMarket')
        .replace('scalability', 'scalabilityPotential')
        .replace('regulatory', 'regulatoryConsiderations');

      if (key in parsedIdea) {
        (parsedIdea as any)[key] = contentText;
      } else if (!parsedIdea.name && !header.includes(':')) {
        parsedIdea.name = header.trim();
      }
    });

    return parsedIdea;
  });
}

function parseFollowUpQuestions(response: string): FollowUpQuestion[] {
  return response.split('Follow-up Question').filter(Boolean).map(q => {
    const sections = q.split('\n').filter(Boolean);
    const question: FollowUpQuestion = {
      question: '',
      importance: '',
      context: '',
      insights: '',
      category: '',
      priority: 'medium',
      relatedTopics: [],
      potentialAnswers: []
    };

    let currentSection = '';
    sections.forEach(section => {
      if (section.includes(':')) {
        const [key, value] = section.split(':').map(s => s.trim());
        const normalizedKey = key.toLowerCase();

        switch (normalizedKey) {
          case 'question':
            question.question = value;
            break;
          case 'category':
            question.category = value;
            break;
          case 'priority':
            question.priority = value.toLowerCase() as 'high' | 'medium' | 'low';
            break;
          case 'importance':
            currentSection = 'importance';
            question.importance = value;
            break;
          case 'context':
            currentSection = 'context';
            question.context = value;
            break;
          case 'expected insights':
            currentSection = 'insights';
            question.insights = value;
            break;
          case 'related topics':
            currentSection = 'relatedTopics';
            if (value) question.relatedTopics = [value];
            break;
          case 'potential answers':
            currentSection = 'potentialAnswers';
            if (value) question.potentialAnswers = [value];
            break;
        }
      } else if (section.trim().startsWith('-')) {
        const value = section.trim().substring(1).trim();
        if (currentSection === 'relatedTopics') {
          question.relatedTopics.push(value);
        } else if (currentSection === 'potentialAnswers') {
          question.potentialAnswers.push(value);
        }
      } else if (currentSection && currentSection !== 'relatedTopics' && currentSection !== 'potentialAnswers') {
        (question as any)[currentSection] += '\n' + section.trim();
      }
    });

    return question;
  });
}

function parseActionableSuggestions(response: string): ActionableSuggestions {
  const sections = response.split('\n\n');
  const result: ActionableSuggestions = {
    immediate_next_steps: '',
    skill_development: '',
    networking_strategy: '',
    resource_allocation: '',
    potential_pitfalls: '',
    implementation_timeline: '',
    risk_mitigation: '',
    success_indicators: '',
    milestone_tracking: '',
    cost_breakdown: '',
    resource_requirements: '',
    contingency_plans: ''
  };
  
  sections.forEach(section => {
    const [header, ...content] = section.split('\n');
    if (header.includes(':')) {
      const key = header.split(':')[0].trim().toLowerCase().replace(/[\s-]+/g, '_');
      if (key in result) {
        result[key] = content.join('\n').trim();
      }
    }
  });
  
  return result;
}

function parseMarketInsights(response: string): MarketInsights {
  const sections = response.split('\n\n');
  const result: MarketInsights = {
    current_trends: '',
    market_gaps: '',
    competitive_landscape: '',
    target_customers: '',
    revenue_potential: '',
    entry_strategy: '',
    growth_opportunities: '',
    market_risks: '',
    market_size_analysis: '',
    customer_segments: '',
    pricing_strategy: '',
    distribution_channels: '',
    regulatory_environment: '',
    technology_trends: ''
  };
  
  sections.forEach(section => {
    const [header, ...content] = section.split('\n');
    if (header.includes(':')) {
      const key = header.split(':')[0].trim().toLowerCase().replace(/[\s-]+/g, '_');
      if (key in result) {
        result[key] = content.join('\n').trim();
      }
    }
  });
  
  return result;
}
