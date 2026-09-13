import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image: string;
}

const SITE_URL = 'https://luddy.dance';

const SEO: React.FC<SEOProps> = ({ title, description, image }) => {
  const videoStructuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://luddy.dance/#website',
        url: 'https://luddy.dance',
        name: 'Luddy Dance',
        description: 'Join the dance with Ludwig and enjoy 10 hours of the Luddy dance!',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://luddy.dance?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'VideoObject',
        '@id': 'https://luddy.dance/#video',
        name: title,
        description: description,
        thumbnailUrl: image,
        uploadDate: '2023-01-01',
        duration: 'PT10H',
        embedUrl: 'https://www.youtube.com/embed/L3Ucukzbp6k',
        contentUrl: 'https://www.youtube.com/watch?v=L3Ucukzbp6k',
        publisher: {
          '@type': 'Organization',
          name: 'Luddy Dance',
          url: 'https://luddy.dance',
        },
        creator: {
          '@type': 'Person',
          name: 'Ludwig',
        },
      },
    ],
  };

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={SITE_URL} />

      {/* Favicon */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/favicon.svg" />

      {/* Open Graph */}
      <meta property="og:type" content="video.other" />
      <meta property="og:site_name" content="Luddy Dance" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="Ludwig dancing the Luddy dance" />
      <meta property="og:url" content={SITE_URL} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@luddy_dance" />
      <meta name="twitter:creator" content="@luddy_dance" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content="Ludwig dancing the Luddy dance" />
      <meta name="twitter:domain" content="luddy.dance" />
      <meta name="twitter:url" content={SITE_URL} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Luddy Dance" />
      <meta name="keywords" content="Ludwig, Luddy, dance, meme, 10 hours, loop, entertainment" />

      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD is built from static server data
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(videoStructuredData).replace(/</g, '\\u003c'),
        }}
      />
    </Head>
  );
};

export default SEO;
