interface BusinessIdea {
  title: string
  description: string
  requirements: string[]
  timeCommitment: string
  initialInvestment: string
  skills: string[]
}

const businessIdeas: Record<string, BusinessIdea[]> = {
  "Technology / Software Development": [
    {
      title: "SaaS Platform",
      description: "Build a software-as-a-service solution targeting specific business needs",
      requirements: ["Technical expertise", "Problem-solving skills", "Market research"],
      timeCommitment: "Full-time",
      initialInvestment: "Low to Medium",
      skills: ["Programming", "UI/UX Design", "Business Development"]
    },
    {
      title: "Mobile App Development",
      description: "Create mobile applications for specific niches or problems",
      requirements: ["Mobile development skills", "UI/UX knowledge", "App store optimization"],
      timeCommitment: "Part-time to Full-time",
      initialInvestment: "Low",
      skills: ["Mobile Development", "UI/UX Design", "Marketing"]
    }
  ],
  "Business / Management": [
    {
      title: "Business Consulting",
      description: "Offer consulting services in your area of expertise",
      requirements: ["Industry experience", "Network", "Communication skills"],
      timeCommitment: "Flexible",
      initialInvestment: "Low",
      skills: ["Consulting", "Business Strategy", "Networking"]
    },
    {
      title: "Online Course Creation",
      description: "Create and sell online courses in your area of expertise",
      requirements: ["Subject matter expertise", "Content creation", "Marketing"],
      timeCommitment: "Part-time",
      initialInvestment: "Low",
      skills: ["Teaching", "Content Creation", "Digital Marketing"]
    }
  ],
  "Creative / Design": [
    {
      title: "Design Agency",
      description: "Offer design services to businesses and individuals",
      requirements: ["Design portfolio", "Client management", "Project management"],
      timeCommitment: "Flexible",
      initialInvestment: "Low",
      skills: ["Design", "Client Management", "Project Management"]
    },
    {
      title: "Digital Products Marketplace",
      description: "Create and sell digital design assets",
      requirements: ["Design skills", "E-commerce knowledge", "Marketing"],
      timeCommitment: "Part-time",
      initialInvestment: "Low",
      skills: ["Design", "E-commerce", "Digital Marketing"]
    }
  ],
  "Marketing / Sales": [
    {
      title: "Digital Marketing Agency",
      description: "Help businesses with their online marketing needs",
      requirements: ["Marketing expertise", "Client management", "Analytics"],
      timeCommitment: "Full-time",
      initialInvestment: "Low to Medium",
      skills: ["Digital Marketing", "Analytics", "Client Management"]
    },
    {
      title: "Social Media Management",
      description: "Manage social media presence for businesses",
      requirements: ["Social media expertise", "Content creation", "Client management"],
      timeCommitment: "Part-time to Full-time",
      initialInvestment: "Low",
      skills: ["Social Media", "Content Creation", "Client Management"]
    }
  ]
}

export function generateRecommendations(
  experience: string,
  interests: string,
  commitment: string,
  resources: string
): BusinessIdea[] {
  // Get ideas based on experience
  let recommendations = businessIdeas[experience] || []

  // Filter based on commitment level
  if (commitment === "Minimal time (5-10 hours/week)") {
    recommendations = recommendations.filter(idea => 
      idea.timeCommitment.includes("Part-time") || idea.timeCommitment === "Flexible"
    )
  }

  // Filter based on resources
  if (resources === "Just getting started") {
    recommendations = recommendations.filter(idea => 
      idea.initialInvestment === "Low"
    )
  }

  // If no recommendations match the criteria, provide general recommendations
  if (recommendations.length === 0) {
    recommendations = [
      {
        title: "Freelancing",
        description: "Start freelancing in your area of expertise",
        requirements: ["Relevant skills", "Time management", "Client communication"],
        timeCommitment: "Flexible",
        initialInvestment: "Low",
        skills: ["Time Management", "Communication", "Project Management"]
      },
      {
        title: "Online Teaching",
        description: "Share your knowledge through online teaching platforms",
        requirements: ["Subject expertise", "Communication skills", "Basic tech setup"],
        timeCommitment: "Part-time",
        initialInvestment: "Low",
        skills: ["Teaching", "Communication", "Basic Tech"]
      }
    ]
  }

  return recommendations
}

export function getResourceRecommendations(resources: string): string[] {
  const baseRecommendations = [
    "Complete your profile to unlock personalized recommendations",
    "Join our community to connect with other entrepreneurs",
    "Explore our resource library for startup guides and templates"
  ]

  const resourceSpecificRecommendations: Record<string, string[]> = {
    "Savings / Capital to invest": [
      "Consider hiring key team members",
      "Invest in professional branding and website",
      "Set up proper business infrastructure"
    ],
    "Technical skills": [
      "Build a minimum viable product (MVP)",
      "Focus on technical validation of your idea",
      "Consider offering technical consulting services"
    ],
    "Industry connections": [
      "Leverage your network for initial customers",
      "Seek mentorship from industry experts",
      "Consider partnership opportunities"
    ],
    "Marketing expertise": [
      "Create a comprehensive marketing strategy",
      "Build your personal brand",
      "Start content marketing early"
    ],
    "Just getting started": [
      "Focus on market research and validation",
      "Start with a side project while maintaining current income",
      "Build your skills through online courses and workshops"
    ]
  }

  return [
    ...baseRecommendations,
    ...(resourceSpecificRecommendations[resources] || [])
  ]
}
