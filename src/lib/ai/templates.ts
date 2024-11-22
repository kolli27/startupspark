import { BusinessIdea, FollowUpQuestion, ActionableSuggestions, MarketInsights } from './types'

export const responseTemplates = {
  businessIdea: `
Business Idea: {name}
==================
Description:
{description}

Target Market:
{targetMarket}

Required Skills:
{skills}

Initial Investment:
{investment}

Potential Challenges:
{challenges}

First Steps:
{steps}

---
`.trim(),

  followUpQuestions: `
Follow-up Question {number}: {question}
Importance: {importance}

---
`.trim(),

  actionableSuggestions: `
Actionable Plan
==============

Immediate Next Steps (30 Days):
{immediateSteps}

Skill Development:
{skillDevelopment}

Networking Strategy:
{networking}

Resource Allocation:
{resources}

Potential Pitfalls:
{pitfalls}

Implementation Timeline:
{timeline}

---
`.trim(),

  marketInsights: `
Market Analysis
==============

Current Trends:
{trends}

Market Gaps:
{gaps}

Competitive Landscape:
{competition}

Target Customers:
{customers}

Revenue Potential:
{revenue}

Entry Strategy:
{strategy}

---
`.trim()
}

export const formatResponse = (template: string, data: Record<string, string>): string => {
  let result = template;
  for (const [key, value] of Object.entries(data)) {
    result = result.replace(`{${key}}`, value);
  }
  return result;
}

function parseBusinessIdeas(response: string): BusinessIdea[] {
  return response.split('Business Idea:').filter(Boolean).map(idea => {
    const sections = idea.split('\n\n');
    return {
      name: sections[0].trim(),
      description: sections.find(s => s.includes('Description:'))?.split('Description:')[1]?.trim() || '',
      targetMarket: sections.find(s => s.includes('Target Market:'))?.split('Target Market:')[1]?.trim() || '',
      skills: sections.find(s => s.includes('Required Skills:'))?.split('Required Skills:')[1]?.trim() || '',
      investment: sections.find(s => s.includes('Initial Investment:'))?.split('Initial Investment:')[1]?.trim() || '',
      challenges: sections.find(s => s.includes('Potential Challenges:'))?.split('Potential Challenges:')[1]?.trim() || '',
      steps: sections.find(s => s.includes('First Steps:'))?.split('First Steps:')[1]?.trim() || '',
    };
  });
}

function parseFollowUpQuestions(response: string): FollowUpQuestion[] {
  return response.split('Follow-up Question').filter(Boolean).map(q => {
    const [question, importance] = q.split('Importance:').map(s => s.trim());
    return {
      question: question.replace(/^\d+:\s*/, '').trim(),
      importance: importance?.split('---')[0].trim() || '',
    };
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
    implementation_timeline: ''
  };
  
  sections.forEach(section => {
    const lines = section.split('\n');
    if (lines[0].includes(':')) {
      const key = lines[0].split(':')[0].trim().toLowerCase().replace(/\s+/g, '_');
      const validKeys: (keyof ActionableSuggestions)[] = [
        'immediate_next_steps',
        'skill_development',
        'networking_strategy',
        'resource_allocation',
        'potential_pitfalls',
        'implementation_timeline'
      ];
      
      if (validKeys.includes(key as keyof ActionableSuggestions)) {
        result[key as keyof ActionableSuggestions] = lines.slice(1).join('\n').trim();
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
    entry_strategy: ''
  };
  
  sections.forEach(section => {
    const lines = section.split('\n');
    if (lines[0].includes(':')) {
      const key = lines[0].split(':')[0].trim().toLowerCase().replace(/\s+/g, '_');
      const validKeys: (keyof MarketInsights)[] = [
        'current_trends',
        'market_gaps',
        'competitive_landscape',
        'target_customers',
        'revenue_potential',
        'entry_strategy'
      ];
      
      if (validKeys.includes(key as keyof MarketInsights)) {
        result[key as keyof MarketInsights] = lines.slice(1).join('\n').trim();
      }
    }
  });
  
  return result;
}

export function parseAIResponse(response: string, type: 'ideas'): BusinessIdea[];
export function parseAIResponse(response: string, type: 'questions'): FollowUpQuestion[];
export function parseAIResponse(response: string, type: 'suggestions'): ActionableSuggestions;
export function parseAIResponse(response: string, type: 'insights'): MarketInsights;
export function parseAIResponse(
  response: string,
  type: 'ideas' | 'questions' | 'suggestions' | 'insights'
): BusinessIdea[] | FollowUpQuestion[] | ActionableSuggestions | MarketInsights {
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
}
