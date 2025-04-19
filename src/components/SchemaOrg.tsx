'use client';

import Script from 'next/script';

// Component for adding structured data to improve SEO
const SchemaOrg = () => {
  // Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'TECSERIM Sarl',
    url: 'https://www.tecserim.com',
    logo: 'https://www.tecserim.com/logo.png',
    sameAs: [
      // Add social media profiles if available
      // 'https://www.facebook.com/tecserim',
      // 'https://www.linkedin.com/company/tecserim',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+212 37 809093',
      contactType: 'customer service',
      areaServed: 'MA',
      availableLanguage: ['French', 'Arabic', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue Ait Amer 26, Hy Inbiat',
      addressLocality: 'Salé',
      postalCode: '11000',
      addressCountry: 'MA',
    },
  };

  // Local business schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'TECSERIM Sarl',
    image: 'https://www.tecserim.com/clima.webp',
    '@id': 'https://www.tecserim.com',
    url: 'https://www.tecserim.com',
    telephone: '+212 37 809093',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue Ait Amer 26, Hy Inbiat',
      addressLocality: 'Salé',
      postalCode: '11000',
      addressCountry: 'MA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.0265, // Replace with actual coordinates
      longitude: -6.8368, // Replace with actual coordinates
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
        ],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
  };

  return (
    <>
      <Script
        id="schema-org-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-org-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
};

export default SchemaOrg; 