import { useAuthState } from '@/atom/authStateAtom';
import Explain from '@/components/Home/Explain';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Home() {
  const [authState, setAuthState] = useAuthState();

  useEffect(() => {
    setAuthState({
      accessToken: (getCookie('accessToken') as string) || null,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Stats for Spotify</title>
        <meta name='description' content='Stats for Spotify' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        {!authState.accessToken ? (
          <Flex
            justify={'center'}
            alignItems={'center'}
            direction={'column'}
            width={'100%'}
            margin='auto'
            gap={'1rem'}
            bg={'gray.200'}
            borderRadius={'5px'}
            padding={'4rem'}
          >
            <Text fontSize={'2rem'}>Stats for Spotify</Text>
            <Text textAlign={'center'}>
              Please login with your spotify account, to see your track or
              artist ranking!
            </Text>
            <Stack width={'90%'} maxWidth={'400px'}>
              <Link href='/api/auth'>
                <Button variant={'default'} type='button'>
                  Login with Spotify
                </Button>
              </Link>
            </Stack>
          </Flex>
        ) : (
          <>
            <Flex
              justify={'center'}
              alignItems={'center'}
              direction={'column'}
              width={'100%'}
              margin='auto'
              gap={'1rem'}
              bg={'gray.200'}
              borderRadius={'5px'}
              padding={'4rem'}
            >
              <Text fontSize={'2rem'}>Stats for Spotify</Text>
              <Text>Choose what you want to see</Text>
              <Stack width={'90%'} maxWidth={'400px'}>
                <Link href='/tracks/top'>
                  <Button variant={'default'}>Top Tracks</Button>
                </Link>
                <Link href='/artists/top'>
                  <Button variant={'default'}>Top Artists</Button>
                </Link>
                <Link href='/tracks/recent'>
                  <Button variant={'default'}>Recently played</Button>
                </Link>
              </Stack>
            </Flex>
          </>
        )}
        <Flex>
          <Explain />
        </Flex>
      </main>
    </>
  );
}
