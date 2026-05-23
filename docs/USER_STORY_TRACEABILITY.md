# User Story Traceability

This document maps the assignment PDF user stories to implemented areas of Orbit Sales OS.

## Sales Representative

- Create and manage customer contacts
  - Covered in `Customers` with add, edit, delete, profile detail, and interaction visibility
- Log daily sales activities and meetings
  - Covered in `Activities` with calls, meetings, notes, and follow-up records
- Create and update sales opportunities with deal values
  - Covered in `Pipeline` with stage tracking, values, probability, and ownership
- View sales targets and current performance metrics
  - Covered in `Dashboard`, `Team`, and route-level KPI summaries

## Sales Manager

- View team performance dashboards
  - Covered in `Team`, `Reports`, and `Dashboard`
- Assign territories and leads to sales representatives
  - Covered in `Team` through territory ownership and workload distribution views
- Review and approve discount requests
  - Covered in `Team` via discount approval actions and audit capture
- Generate sales forecasts and pipeline reports
  - Covered in `Dashboard` and `Reports` via forecast, funnel, and trend visuals

## Account Manager

- View complete customer history and interactions
  - Covered in `Customer detail` pages and the `Activities` timeline
- Track customer satisfaction metrics
  - Covered in `Customers` and customer detail views with health and satisfaction indicators
- Create and manage account plans
  - Covered in customer/account planning panels and structured profile insights
- Set up automated renewal reminders
  - Covered through renewal-focused account data and reminder-oriented customer timeline details

## Marketing Team

- Track campaign performance against sales data
  - Covered in `Marketing` with spend, influenced revenue, ROI, and pipeline linkage
- Share qualified leads with the sales team
  - Covered in `Marketing` lead-sharing workflows and shared performance context
- Access customer segments and insights
  - Covered in `Marketing` and `Customers` with segmentation-oriented data views
- Collaborate with sales on content creation
  - Covered through shared campaign and product-information context in cross-functional screens

## Product Manager

- Share product updates and roadmaps with sales
  - Covered in `Product` through update and roadmap visibility
- Collect customer feedback from sales interactions
  - Covered in `Product` and customer feedback panels
- Maintain product documentation
  - Covered in `Product` documentation cards and updates
- Track feature requests from customers
  - Covered in `Product` feature request tracking and prioritization views

## Executive Leadership

- View high-level sales analytics
  - Covered in `Dashboard` and `Executive`
- Track KPIs across regions
  - Covered in regional charts, forecasts, and comparison views
- Monitor competitive win/loss rates
  - Covered in `Reports` and `Executive`
- Access real-time revenue forecasts
  - Covered in forecast widgets, weighted pipeline, and revenue trend analysis

## Cross-Cutting Submission Requirements

- Modern professional UI
  - Implemented via a premium responsive design system, motion, multi-theme support, and reusable components
- Charts and analytics
  - Implemented with KPI cards, revenue trends, regional charts, win/loss distribution, and funnel views
- Local simplicity
  - No backend or database setup required; seeded data persists in browser storage
- Documentation and submission assets
  - Included in `docs/`, `power-bi/`, and `screenshots/`
