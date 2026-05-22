# Orbit Sales OS

Orbit Sales OS is a polished CRM-style Sales Management System built for the HOSHO Digital internship screening assignment. It is designed to feel like a modern SaaS revenue platform with role-based flows, premium dashboards, strong visual analytics, realistic demo data, and zero external infrastructure requirements.

## What is included

- Role-based mock login for Sales Representative, Sales Manager, Account Manager, Marketing Team, Product Manager, and Executive Leadership
- Dashboard with KPI cards, sales trends, revenue insights, conversion signals, regional performance, and forecast visuals
- Customer management with add/edit/delete, interaction history, and customer profile pages
- Pipeline management with opportunity tracking, deal values, stages, and ownership
- Activities workspace for calls, meetings, notes, and follow-ups
- Team performance area for leaderboard views, territory coverage, and discount approvals
- Reports and analytics experience for forecasting, win/loss views, and regional comparisons
- Marketing workspace for campaign ROI, lead sharing, and segment insights
- Product workspace for updates, feature requests, and customer feedback
- Executive analytics view for strategic oversight
- Local persistence via browser storage so the app works immediately after startup

## Stack

- React 19
- Vite
- Tailwind CSS
- React Router
- Recharts
- Framer Motion
- React Icons
- Vitest

## Local run

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
```

Test run:

```bash
npm run test:run
```

## Why it is easy to evaluate

- No backend service required
- No database setup required
- No cloud credentials required
- No `.env` file required
- Demo data is preloaded and persisted locally

## Project structure

```text
src/
  app/
  components/
    charts/
    common/
    layout/
  context/
  data/
  pages/
  styles/
  test/
  utils/
power-bi/
screenshots/
docs/
```

## Architecture summary

- `src/context/AppContext.jsx` manages role session, theme, and persistent CRM data
- `src/data/mockData.js` contains realistic seed data across customers, opportunities, campaigns, targets, and product feedback
- `src/pages/*` maps business capabilities into route-level workspaces
- `src/components/charts/Charts.jsx` centralizes reusable analytics visuals
- `src/utils/metrics.js` computes KPI snapshots and strategic insight narratives

## Submission assets

- Solution document: [docs/Hosho_Sales_CRM_Solution_Document.docx](/C:/Users/aryan/OneDrive/Documents/New%20project%202/docs/Hosho_Sales_CRM_Solution_Document.docx)
- ERD source: [docs/Hosho_Sales_CRM_ERD.drawio](/C:/Users/aryan/OneDrive/Documents/New%20project%202/docs/Hosho_Sales_CRM_ERD.drawio)
- ERD preview: [docs/Hosho_Sales_CRM_ERD.png](/C:/Users/aryan/OneDrive/Documents/New%20project%202/docs/Hosho_Sales_CRM_ERD.png)
- Architecture diagram: [docs/Hosho_Sales_CRM_Architecture.png](/C:/Users/aryan/OneDrive/Documents/New%20project%202/docs/Hosho_Sales_CRM_Architecture.png)
- Power BI dataset: [power-bi/Hosho_Sales_CRM_PowerBI_Dataset.xlsx](/C:/Users/aryan/OneDrive/Documents/New%20project%202/power-bi/Hosho_Sales_CRM_PowerBI_Dataset.xlsx)
- Power BI guide: [docs/POWER_BI_GUIDE.md](/C:/Users/aryan/OneDrive/Documents/New%20project%202/docs/POWER_BI_GUIDE.md)
- Screenshots folder: [screenshots](/C:/Users/aryan/OneDrive/Documents/New%20project%202/screenshots)

## Screenshots

![Dashboard](/C:/Users/aryan/OneDrive/Documents/New%20project%202/screenshots/dashboard.png)

![Customers](/C:/Users/aryan/OneDrive/Documents/New%20project%202/screenshots/customers.png)

## Notes

- The project intentionally uses a front-end-first architecture to maximize local simplicity for evaluators.
- The included Excel workbook is structured for direct import into Power BI Desktop.
- Power BI design guidance is included so visuals can be recreated or extended quickly from the provided dataset.
