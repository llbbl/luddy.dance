// pages/_app.tsx
import type { AppProps } from 'next/app';

import Layout from '@/components/layout'; // Adjust the path as needed

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
export default MyApp;
