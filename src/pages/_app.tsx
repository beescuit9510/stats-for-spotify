import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/Layout';
import { theme } from '@/chakra/theme';
import PageContent from '@/components/Layout/PageContent';
import { RecoilRoot } from 'recoil';
import ErrorAlert from '@/components/Alert';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Layout>
          <PageContent>
            <Component {...pageProps} />
          </PageContent>
        </Layout>
        <ErrorAlert />
      </ChakraProvider>
    </RecoilRoot>
  );
}
