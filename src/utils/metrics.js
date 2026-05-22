export function createMetricsSnapshot(data) {
  const openOpportunities = data.opportunities.filter((item) => item.status === "Open");
  const wonOpportunities = data.opportunities.filter((item) => item.status === "Won");
  const lostOpportunities = data.opportunities.filter((item) => item.status === "Lost");
  const openPipelineValue = openOpportunities.reduce((sum, item) => sum + item.value, 0);
  const forecastValue = openOpportunities.reduce(
    (sum, item) => sum + item.value * (item.probability / 100),
    0
  );
  const wonRevenue = wonOpportunities.reduce((sum, item) => sum + item.value, 0);
  const campaignSpend = data.campaigns.reduce((sum, item) => sum + item.spend, 0);
  const campaignRevenue = data.campaigns.reduce((sum, item) => sum + item.influencedRevenue, 0);
  const averageHealth =
    data.customers.reduce((sum, item) => sum + item.healthScore, 0) / data.customers.length;
  const totalQuota = data.targets.reduce((sum, item) => sum + item.quota, 0);
  const totalAttained = data.targets.reduce((sum, item) => sum + item.attained, 0);
  const winRate =
    wonOpportunities.length + lostOpportunities.length === 0
      ? 0
      : wonOpportunities.length / (wonOpportunities.length + lostOpportunities.length);

  return {
    openPipelineValue,
    forecastValue,
    wonRevenue,
    averageHealth,
    campaignRoi: campaignSpend === 0 ? 0 : campaignRevenue / campaignSpend,
    totalCustomers: data.customers.length,
    winRate,
    quotaAttainment: totalQuota === 0 ? 0 : totalAttained / totalQuota,
    pendingDiscounts: data.discountRequests.filter((item) => item.status === "Pending").length
  };
}

export function createInsights(data, metrics) {
  const bestRegion = [...data.regionalPerformance].sort((a, b) => b.revenue - a.revenue)[0];
  const biggestOpportunity = [...data.opportunities].sort((a, b) => b.value - a.value)[0];
  const topCampaign = [...data.campaigns].sort((a, b) => b.roi - a.roi)[0];
  const atRiskCustomer = [...data.customers].sort((a, b) => a.healthScore - b.healthScore)[0];

  return [
    {
      id: "insight-1",
      title: `${bestRegion.region} remains the growth engine`,
      body: `Regional revenue is ${bestRegion.revenue.toLocaleString()} with a ${Math.round(
        bestRegion.winRate * 100
      )}% win rate, staying ahead of the broader business average.`
    },
    {
      id: "insight-2",
      title: "Pipeline quality is strong but concentrated",
      body: `Weighted forecast stands at ${Math.round(
        metrics.forecastValue
      ).toLocaleString()} and the largest live opportunity is ${
        biggestOpportunity.name
      }, which accounts for a meaningful share of near-term upside.`
    },
    {
      id: "insight-3",
      title: `${topCampaign.name} is the highest-return program`,
      body: `Marketing ROI is strongest in ${topCampaign.channel}, where current return is ${topCampaign.roi.toFixed(
        1
      )}x and qualified lead velocity is above target.`
    },
    {
      id: "insight-4",
      title: `${atRiskCustomer.name} needs proactive rescue`,
      body: `Customer health sits at ${atRiskCustomer.healthScore}/100, making it the most urgent account for renewal preservation and service intervention.`
    }
  ];
}

export function buildPipelineStageSummary(opportunities) {
  const stageOrder = [
    "Qualified",
    "Proposal",
    "Negotiation",
    "At Risk",
    "Closed Won",
    "Closed Lost"
  ];

  return stageOrder.map((stage) => {
    const matches = opportunities.filter((item) => item.stage === stage);
    return {
      stage,
      count: matches.length,
      value: matches.reduce((sum, item) => sum + item.value, 0)
    };
  });
}
