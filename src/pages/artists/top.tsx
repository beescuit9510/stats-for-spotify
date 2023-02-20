import { authState } from '@/atom/authStateAtom';
import { loginAlertState } from '@/atom/loginAlertAtom';
import ArtistItem from '@/components/Stats/ArtistItems';
import Stats from '@/components/Stats/Index';
import {
  Artist,
  fetchTopArtists,
  logout,
  TabType,
  topTabTypes,
} from '@/spotify/spotifyApi';
import { Flex, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

const ArtistTopPage: React.FC = () => {
  const [selectedTap, setSelectedTap] = useState<TabType>(topTabTypes[0]);

  const [artists, setArtists] = useState<Artist[]>([]);

  const router = useRouter();
  const resetAuthState = useResetRecoilState(authState);
  const setLoginAlertValue = useSetRecoilState(loginAlertState);

  useEffect(() => {
    fetchTopArtists(selectedTap)
      .then(setArtists)
      .catch((err) => {
        console.error(err);
        setLoginAlertValue({ enabled: true, type: 'tokenExpired' });
        logout();
        resetAuthState();
        router.push('/');
      });
  }, [selectedTap, router, resetAuthState, setLoginAlertValue]);

  return (
    <>
      <Stats
        pageTitle='Top Artists'
        selectedTap={selectedTap}
        setSelectedTap={setSelectedTap}
      >
        <Flex
          direction={'row'}
          flexWrap={'wrap'}
          justify='space-between'
          mt={'3rem'}
        >
          {artists.length !== 0
            ? artists.map((artist) => {
                return (
                  <ArtistItem
                    artist={artist}
                    key={artist.artistId}
                    tabType={selectedTap}
                  />
                );
              })
            : new Array(25).fill(0).map((ele, index) => {
                return (
                  <Flex
                    as={Skeleton}
                    justify={'center'}
                    align={'center'}
                    width={{ base: '100%', md: '30%' }}
                    height={{ base: '22%', md: '30%' }}
                    direction='column'
                    paddingBottom={'2rem'}
                    marginBottom={'1rem'}
                    marginTop={'1rem'}
                    key={index}
                  >
                    i am a dummy text
                  </Flex>
                );
              })}
        </Flex>
      </Stats>
    </>
  );
};
export default ArtistTopPage;
