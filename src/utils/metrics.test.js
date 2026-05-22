import { createMetricsSnapshot } from "./metrics";

describe("createMetricsSnapshot", () => {
  it("calculates weighted forecast and win rate from opportunity data", () => {
    const metrics = createMetricsSnapshot({
      opportunities: [
        { status: "Open", probability: 50, value: 200 },
        { status: "Open", probability: 25, value: 100 },
        { status: "Won", probability: 100, value: 120 },
        { status: "Lost", probability: 0, value: 80 }
      ],
      campaigns: [{ spend: 100, influencedRevenue: 400 }],
      customers: [{ healthScore: 80 }, { healthScore: 100 }],
      targets: [{ quota: 1000, attained: 700 }],
      discountRequests: [{ status: "Pending" }, { status: "Approved" }]
    });

    expect(metrics.forecastValue).toBe(125);
    expect(metrics.openPipelineValue).toBe(300);
    expect(metrics.winRate).toBe(0.5);
    expect(metrics.averageHealth).toBe(90);
    expect(metrics.campaignRoi).toBe(4);
    expect(metrics.quotaAttainment).toBe(0.7);
    expect(metrics.pendingDiscounts).toBe(1);
  });
});
