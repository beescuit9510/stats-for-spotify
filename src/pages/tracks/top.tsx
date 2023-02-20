import { authState } from '@/atom/authStateAtom';
import { loginAlertState } from '@/atom/loginAlertAtom';
import Stats from '@/components/Stats/Index';
import TrackItem from '@/components/Stats/TrackItem';
import {
  fetchTopTracks,
  logout,
  TabType,
  topTabTypes,
  Track,
} from '@/spotify/spotifyApi';
import { Flex, Skeleton, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

const TopTrackPage: React.FC = () => {
  const [selectedTap, setSelectedTap] = useState<TabType>(topTabTypes[0]);

  const [tracks, setTracks] = useState<Track[]>([]);

  const router = useRouter();
  const resetAuthState = useResetRecoilState(authState);
  const setLoginAlertValue = useSetRecoilState(loginAlertState);

  useEffect(() => {
    fetchTopTracks(selectedTap)
      .then(setTracks)
      .catch((err) => {
        console.log(err);
        setLoginAlertValue({ enabled: true, type: 'tokenExpired' });
        logout();
        resetAuthState();
        router.push('/');
      });
  }, [selectedTap, router, resetAuthState, setLoginAlertValue]);

  return (
    <Stats
      pageTitle='Top Tracks'
      selectedTap={selectedTap}
      setSelectedTap={setSelectedTap}
    >
      <Stack>
        {tracks.length !== 0
          ? tracks.map((track) => {
              return (
                <TrackItem
                  key={track.rank}
                  track={track}
                  tabType={selectedTap}
                />
              );
            })
          : new Array(25).fill(0).map((ele, index) => {
              return (
                <Stack
                  key={index}
                  spacing='1rem'
                  padding={'2rem'}
                  paddingBottom='0rem'
                >
                  <Flex justify='space-between' align='center' gap={'1rem'}>
                    <Skeleton height='50px' width={'50px'} />
                    <Stack height='50px' flexGrow={'1'}>
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                      <Skeleton height='20px' />
                    </Stack>
                  </Flex>
                </Stack>
              );
            })}
      </Stack>
    </Stats>
  );
};
export default TopTrackPage;
