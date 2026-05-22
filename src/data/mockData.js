export const roles = [
  {
    id: "sales-rep",
    title: "Sales Representative",
    summary: "Own pipeline, customer meetings, and target attainment."
  },
  {
    id: "sales-manager",
    title: "Sales Manager",
    summary: "Oversee territories, discounts, forecasts, and team output."
  },
  {
    id: "account-manager",
    title: "Account Manager",
    summary: "Protect renewals, service quality, and account growth plans."
  },
  {
    id: "marketing",
    title: "Marketing Team",
    summary: "Track campaigns, share qualified leads, and measure ROI."
  },
  {
    id: "product-manager",
    title: "Product Manager",
    summary: "Capture feedback, publish product updates, and rank requests."
  },
  {
    id: "executive",
    title: "Executive Leadership",
    summary: "Review business-wide KPIs, forecasts, and regional performance."
  }
];

export const initialData = {
  users: [
    { id: "user-sr-jordan", name: "Jordan Lee", role: "sales-rep", region: "North America" },
    { id: "user-sr-sana", name: "Sana Patel", role: "sales-rep", region: "APAC" },
    { id: "user-sm-lucia", name: "Lucia Warren", role: "sales-manager", region: "Global" },
    { id: "user-am-noah", name: "Noah Silva", role: "account-manager", region: "North America" },
    { id: "user-mkt-rhea", name: "Rhea Kapoor", role: "marketing", region: "Global" },
    { id: "user-pm-evan", name: "Evan Brooks", role: "product-manager", region: "Global" },
    { id: "user-exec-maya", name: "Maya Chen", role: "executive", region: "Global" }
  ],
  customers: [
    {
      id: "cust-aurora",
      name: "Aurora Retail Group",
      industry: "Retail",
      region: "North America",
      tier: "Enterprise",
      ownerId: "user-am-noah",
      healthScore: 88,
      satisfaction: 4.5,
      annualValue: 240000,
      renewalDate: "2026-08-15",
      contactName: "Melissa Grant",
      contactEmail: "melissa.grant@auroraretail.example",
      phone: "+1 415 555 0198",
      notes: "Expanding into omnichannel loyalty analytics.",
      accountPlan:
        "Position the InsightFlow bundle as the single command center for field ops and retention teams."
    },
    {
      id: "cust-vanta",
      name: "Vanta Mobility",
      industry: "Mobility",
      region: "EMEA",
      tier: "Mid-Market",
      ownerId: "user-sr-jordan",
      healthScore: 72,
      satisfaction: 4.1,
      annualValue: 125000,
      renewalDate: "2026-11-03",
      contactName: "Ibrahim Khan",
      contactEmail: "ibrahim.khan@vantamobility.example",
      phone: "+44 20 5550 1200",
      notes: "Needs discount approval for multi-region rollout.",
      accountPlan: "Upsell automation seats after pilot expansion proves usage depth."
    },
    {
      id: "cust-pulse",
      name: "PulseCare Clinics",
      industry: "Healthcare",
      region: "APAC",
      tier: "Enterprise",
      ownerId: "user-sr-sana",
      healthScore: 91,
      satisfaction: 4.8,
      annualValue: 310000,
      renewalDate: "2026-09-28",
      contactName: "Ananya Prakash",
      contactEmail: "ananya.prakash@pulsecare.example",
      phone: "+91 22 5555 4401",
      notes: "Looking for deeper reporting on appointment conversions.",
      accountPlan: "Bundle executive analytics with patient engagement reporting."
    },
    {
      id: "cust-halo",
      name: "Halo Logistics",
      industry: "Logistics",
      region: "North America",
      tier: "SMB",
      ownerId: "user-sr-jordan",
      healthScore: 63,
      satisfaction: 3.9,
      annualValue: 54000,
      renewalDate: "2026-07-07",
      contactName: "Damien Ross",
      contactEmail: "damien.ross@halologistics.example",
      phone: "+1 303 555 7001",
      notes: "At risk because onboarding stalled in one regional hub.",
      accountPlan: "Stabilize adoption and recover NPS before presenting the premium plan."
    }
  ],
  interactions: [
    {
      id: "int-1",
      customerId: "cust-aurora",
      type: "Executive review",
      ownerId: "user-am-noah",
      date: "2026-05-19",
      note: "Presented Q2 expansion plan and mapped renewal dependencies."
    },
    {
      id: "int-2",
      customerId: "cust-vanta",
      type: "Discovery call",
      ownerId: "user-sr-jordan",
      date: "2026-05-17",
      note: "Reviewed Europe deployment blockers and discount expectations."
    },
    {
      id: "int-3",
      customerId: "cust-pulse",
      type: "Roadmap workshop",
      ownerId: "user-sr-sana",
      date: "2026-05-15",
      note: "Captured product feedback around referral funnel reporting."
    },
    {
      id: "int-4",
      customerId: "cust-halo",
      type: "Support escalation",
      ownerId: "user-am-noah",
      date: "2026-05-12",
      note: "Resolved API sync issue with one warehouse partner."
    }
  ],
  opportunities: [
    {
      id: "opp-1",
      name: "Aurora Expansion - Loyalty Intelligence",
      customerId: "cust-aurora",
      stage: "Proposal",
      ownerId: "user-am-noah",
      region: "North America",
      probability: 74,
      value: 180000,
      expectedClose: "2026-06-28",
      source: "Account Growth",
      status: "Open"
    },
    {
      id: "opp-2",
      name: "Vanta EMEA Rollout",
      customerId: "cust-vanta",
      stage: "Negotiation",
      ownerId: "user-sr-jordan",
      region: "EMEA",
      probability: 66,
      value: 220000,
      expectedClose: "2026-06-14",
      source: "Partner Lead",
      status: "Open"
    },
    {
      id: "opp-3",
      name: "PulseCare Patient Analytics",
      customerId: "cust-pulse",
      stage: "Qualified",
      ownerId: "user-sr-sana",
      region: "APAC",
      probability: 58,
      value: 260000,
      expectedClose: "2026-07-11",
      source: "Campaign",
      status: "Open"
    },
    {
      id: "opp-4",
      name: "Halo Logistics Renewal Recovery",
      customerId: "cust-halo",
      stage: "At Risk",
      ownerId: "user-sr-jordan",
      region: "North America",
      probability: 35,
      value: 62000,
      expectedClose: "2026-06-02",
      source: "Renewal",
      status: "Open"
    },
    {
      id: "opp-5",
      name: "Nova Capital Forecast Suite",
      customerId: "cust-aurora",
      stage: "Closed Won",
      ownerId: "user-sr-jordan",
      region: "North America",
      probability: 100,
      value: 145000,
      expectedClose: "2026-04-23",
      source: "Outbound",
      status: "Won"
    },
    {
      id: "opp-6",
      name: "EverPeak Manufacturing Pilot",
      customerId: "cust-vanta",
      stage: "Closed Lost",
      ownerId: "user-sr-sana",
      region: "EMEA",
      probability: 0,
      value: 95000,
      expectedClose: "2026-03-11",
      source: "Event",
      status: "Lost"
    }
  ],
  activities: [
    {
      id: "act-1",
      title: "Follow-up pricing review",
      type: "Call",
      ownerId: "user-sr-jordan",
      customerId: "cust-vanta",
      dueDate: "2026-05-23",
      outcome: "Pending",
      note: "Confirm discount structure before procurement sync."
    },
    {
      id: "act-2",
      title: "Renewal readiness workshop",
      type: "Meeting",
      ownerId: "user-am-noah",
      customerId: "cust-aurora",
      dueDate: "2026-05-24",
      outcome: "Scheduled",
      note: "Review adoption map, product expansion, and contract term options."
    },
    {
      id: "act-3",
      title: "Product feedback digest",
      type: "Note",
      ownerId: "user-sr-sana",
      customerId: "cust-pulse",
      dueDate: "2026-05-22",
      outcome: "Done",
      note: "Sent workflow enhancement notes to product leadership."
    },
    {
      id: "act-4",
      title: "Warehouse adoption check-in",
      type: "Follow-up",
      ownerId: "user-am-noah",
      customerId: "cust-halo",
      dueDate: "2026-05-25",
      outcome: "Scheduled",
      note: "Measure progress against onboarding rescue plan."
    }
  ],
  targets: [
    { id: "target-1", ownerId: "user-sr-jordan", quota: 600000, attained: 412000, meetings: 34, winRate: 0.29 },
    { id: "target-2", ownerId: "user-sr-sana", quota: 720000, attained: 508000, meetings: 41, winRate: 0.34 },
    { id: "target-3", ownerId: "user-am-noah", quota: 950000, attained: 701000, meetings: 27, winRate: 0.41 }
  ],
  territories: [
    { id: "terr-1", name: "North America Enterprise", ownerId: "user-sr-jordan", leadsOpen: 14, coverage: 0.87 },
    { id: "terr-2", name: "APAC Strategic", ownerId: "user-sr-sana", leadsOpen: 11, coverage: 0.92 },
    { id: "terr-3", name: "Global Accounts", ownerId: "user-am-noah", leadsOpen: 9, coverage: 0.81 }
  ],
  discountRequests: [
    { id: "dr-1", opportunityId: "opp-2", percent: 12, status: "Pending", requestedBy: "user-sr-jordan" },
    { id: "dr-2", opportunityId: "opp-3", percent: 8, status: "Approved", requestedBy: "user-sr-sana" }
  ],
  campaigns: [
    {
      id: "camp-1",
      name: "Pipeline Pulse Summit",
      channel: "Field Event",
      spend: 42000,
      influencedRevenue: 198000,
      leads: 126,
      qualifiedLeads: 42,
      roi: 3.71,
      ownerId: "user-mkt-rhea"
    },
    {
      id: "camp-2",
      name: "APAC Conversion Sprint",
      channel: "Paid Social",
      spend: 28000,
      influencedRevenue: 141000,
      leads: 198,
      qualifiedLeads: 58,
      roi: 4.04,
      ownerId: "user-mkt-rhea"
    },
    {
      id: "camp-3",
      name: "Executive Insight Series",
      channel: "Webinar",
      spend: 16500,
      influencedRevenue: 102000,
      leads: 84,
      qualifiedLeads: 26,
      roi: 5.18,
      ownerId: "user-mkt-rhea"
    }
  ],
  customerSegments: [
    { id: "seg-1", name: "Expansion Ready", accounts: 18, avgDealSize: 154000, trend: "+12%" },
    { id: "seg-2", name: "Renewal Watchlist", accounts: 7, avgDealSize: 67000, trend: "-4%" },
    { id: "seg-3", name: "Product Champions", accounts: 11, avgDealSize: 231000, trend: "+9%" }
  ],
  productUpdates: [
    {
      id: "prod-1",
      title: "Forecast Studio 2.1",
      launchDate: "2026-05-30",
      audience: "Sales + Executive",
      summary: "Adds AI-assisted scenario planning and variance narratives."
    },
    {
      id: "prod-2",
      title: "Voice of Customer Hub",
      launchDate: "2026-06-18",
      audience: "Account + Product",
      summary: "Centralizes call notes, survey insights, and feature themes."
    }
  ],
  featureRequests: [
    {
      id: "fr-1",
      title: "Territory overlap alerts",
      customerId: "cust-vanta",
      priority: "High",
      status: "In Review",
      votes: 18,
      ownerId: "user-pm-evan"
    },
    {
      id: "fr-2",
      title: "Renewal sentiment scorecard",
      customerId: "cust-aurora",
      priority: "Medium",
      status: "Planned",
      votes: 11,
      ownerId: "user-pm-evan"
    },
    {
      id: "fr-3",
      title: "Referral funnel analytics",
      customerId: "cust-pulse",
      priority: "Critical",
      status: "Discovery",
      votes: 23,
      ownerId: "user-pm-evan"
    }
  ],
  feedbackItems: [
    {
      id: "fb-1",
      customerId: "cust-pulse",
      theme: "Analytics depth",
      source: "Workshop",
      sentiment: "Positive",
      summary: "Loves live dashboards but wants drill-down for referral sources."
    },
    {
      id: "fb-2",
      customerId: "cust-halo",
      theme: "Implementation support",
      source: "Support escalation",
      sentiment: "Neutral",
      summary: "Needs clearer deployment checkpoints for regional onboarding."
    },
    {
      id: "fb-3",
      customerId: "cust-vanta",
      theme: "Pricing flexibility",
      source: "Discovery call",
      sentiment: "Negative",
      summary: "Procurement is pushing for multi-year discounting."
    }
  ],
  revenueSeries: [
    { month: "Jan", actual: 320000, forecast: 305000, pipeline: 458000 },
    { month: "Feb", actual: 348000, forecast: 332000, pipeline: 475000 },
    { month: "Mar", actual: 371000, forecast: 356000, pipeline: 492000 },
    { month: "Apr", actual: 395000, forecast: 381000, pipeline: 508000 },
    { month: "May", actual: 428000, forecast: 402000, pipeline: 531000 },
    { month: "Jun", actual: 452000, forecast: 438000, pipeline: 560000 }
  ],
  regionalPerformance: [
    { region: "North America", revenue: 982000, winRate: 0.38, pipeline: 731000, roi: 4.1 },
    { region: "EMEA", revenue: 644000, winRate: 0.29, pipeline: 488000, roi: 3.3 },
    { region: "APAC", revenue: 811000, winRate: 0.35, pipeline: 562000, roi: 4.6 },
    { region: "LATAM", revenue: 271000, winRate: 0.24, pipeline: 209000, roi: 2.7 }
  ],
  winLoss: [
    { label: "Won", value: 38 },
    { label: "Lost", value: 17 },
    { label: "Open", value: 24 }
  ]
};
