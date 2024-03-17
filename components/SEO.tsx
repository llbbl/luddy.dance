import Head from 'next/head';

interface SEOProps {
  title: string;
  description: string;
  image: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="luddy.dance" />
      <meta property="twitter:url" content="http://luddy.dance" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default SEO;
