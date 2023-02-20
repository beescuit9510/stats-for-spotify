import { authState } from '@/atom/authStateAtom';
import { loginAlertState } from '@/atom/loginAlertAtom';
import Stats from '@/components/Stats/Index';
import RecentTrackItem from '@/components/Stats/RecentTrackItem';
import {
  fetchRecentlyPlayedTrack,
  logout,
  RecentlyPlayedTrack,
} from '@/spotify/spotifyApi';
import { Alert, Flex, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

const RecentPlayedTrackPage: React.FC = () => {
  const [tracks, setTracks] = useState<RecentlyPlayedTrack[]>([]);

  const router = useRouter();
  const resetAuthState = useResetRecoilState(authState);
  const setLoginAlertValue = useSetRecoilState(loginAlertState);

  useEffect(() => {
    fetchRecentlyPlayedTrack()
      .then(setTracks)
      .catch((err) => {
        console.log(err);
        setLoginAlertValue({ enabled: true, type: 'tokenExpired' });
        logout();
        resetAuthState();
        router.push('/');
      });
  }, [router, resetAuthState, setLoginAlertValue]);

  return (
    <Stats pageTitle='Top Tracks'>
      <Alert>
        <Flex textAlign={'center'}>
          <Text fontWeight={'700'} as={'span'} display='inline'>
            NOTE:
          </Text>
          <Text>
            A track must be played for more than 30 seconds to be included in
            play history and any tracks listened to while in &quot;Private
            Session&quot; will not be shown here.
          </Text>
        </Flex>
      </Alert>
      <Stack>
        {tracks.length !== 0
          ? tracks.map((track) => {
              return <RecentTrackItem key={track.trackId} track={track} />;
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
export default RecentPlayedTrackPage;
