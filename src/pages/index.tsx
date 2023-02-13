import Explain from '@/components/Home/Explain';
import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Stats for Spotify</title>
        <meta name='description' content='Stats for Spotify' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
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
            <Button variant={'default'}>
              <Link href='/tracks/top'>Top Tracks</Link>
            </Button>
            <Button variant={'default'}>
              <Link href='/artists/top'>Top Artists</Link>
            </Button>
            <Button variant={'default'}>
              <Link href='/genre/top'>Top Generes</Link>
            </Button>
          </Stack>
        </Flex>
        <Flex>
          <Explain />
        </Flex>
      </main>
    </>
  );
}
