# Power BI Guide

Use `Hosho_Sales_CRM_PowerBI_Dataset.xlsx` as the data source in Power BI Desktop with import mode.

## Recommended model

- `Customers[CustomerID]` -> `Opportunities[CustomerID]`
- `Customers[CustomerID]` -> `Activities[CustomerID]`
- `Customers[CustomerID]` -> `FeatureRequests[CustomerID]`

## Suggested dashboard pages

1. Executive Overview
   - KPI cards: Open Pipeline, Weighted Forecast, Booked Revenue, Win Rate
   - Line chart: `RevenueMonthly`
   - Clustered bar chart: `RegionalPerformance`
   - Donut chart: Opportunity status split

2. Sales Pipeline
   - Funnel chart: opportunity stages
   - Table: top open deals
   - Slicer: region

3. Customer Health
   - Matrix: customer health, satisfaction, annual value, renewal date
   - Scatter chart: satisfaction vs annual value

4. Marketing Performance
   - ROI by campaign
   - Leads vs qualified leads
   - Channel filter

5. Product Feedback
   - Feature request priority counts
   - Votes by status
   - Customer feedback themes

## Useful DAX examples

```text
Open Pipeline =
CALCULATE(SUM(Opportunities[Value]), Opportunities[Status] = "Open")

Weighted Forecast =
SUMX(
    FILTER(Opportunities, Opportunities[Status] = "Open"),
    Opportunities[Value] * DIVIDE(Opportunities[Probability], 100)
)

Booked Revenue =
CALCULATE(SUM(Opportunities[Value]), Opportunities[Status] = "Won")

Campaign ROI =
DIVIDE(SUM(Campaigns[InfluencedRevenue]), SUM(Campaigns[Spend]))
```
