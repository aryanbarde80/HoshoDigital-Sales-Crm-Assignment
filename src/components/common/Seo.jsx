import { Helmet } from "react-helmet-async";

const SITE_NAME = "Orbit Sales OS";
const DEFAULT_DESCRIPTION =
  "Orbit Sales OS is a polished sales management CRM with dashboards, pipeline intelligence, customer management, and role-based analytics.";
const DEFAULT_IMAGE = "/favicon.svg";

export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = "sales crm, sales management system, pipeline dashboard, customer management, revenue analytics, internship assignment",
  image = DEFAULT_IMAGE
}) {
  const canonicalUrl = `https://orbit-sales-os.vercel.app${path}`;
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: SITE_NAME,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description,
          url: canonicalUrl
        })}
      </script>
    </Helmet>
  );
}
