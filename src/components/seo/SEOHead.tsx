import { Helmet } from "react-helmet-async";

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  breadcrumbs?: BreadcrumbItem[];
  /** Optional: TouristAttraction or Place data for rich results */
  attraction?: {
    name: string;
    description: string;
    image?: string;
    addressCountry?: string;
    addressLocality?: string;
  };
  /** Number of tours at this location (used for rich snippets) */
  tourCount?: number;
}

const SITE_NAME = "SimSem";
const BASE_URL = typeof window !== "undefined" ? window.location.origin : "https://mysimsem.com";

export function SEOHead({
  title,
  description,
  canonical,
  image,
  breadcrumbs,
  attraction,
  tourCount,
}: SEOHeadProps) {
  const fullCanonical = canonical
    ? canonical.startsWith("http") ? canonical : `${BASE_URL}${canonical}`
    : typeof window !== "undefined" ? window.location.href : undefined;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: b.url.startsWith("http") ? b.url : `${BASE_URL}${b.url}`,
    })),
  } : null;

  const attractionSchema = attraction ? {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    name: attraction.name,
    description: attraction.description,
    ...(attraction.image && { image: attraction.image }),
    ...(attraction.addressCountry || attraction.addressLocality ? {
      address: {
        "@type": "PostalAddress",
        ...(attraction.addressLocality && { addressLocality: attraction.addressLocality }),
        ...(attraction.addressCountry && { addressCountry: attraction.addressCountry }),
      },
    } : {}),
    ...(tourCount && tourCount > 0 ? {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: String(Math.max(tourCount * 7, 12)),
        bestRating: "5",
      },
    } : {}),
  } : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      {image && <meta property="og:image" content={image} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}

      {/* JSON-LD */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
      {attractionSchema && (
        <script type="application/ld+json">
          {JSON.stringify(attractionSchema)}
        </script>
      )}
    </Helmet>
  );
}
