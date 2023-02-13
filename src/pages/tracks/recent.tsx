import Stats from '@/components/Stats/Index';
import RecentTrackItem from '@/components/Stats/RecentTrackItem';
import {
  fetchRecentlyPlayedTrack,
  RecentlyPlayedTrack,
} from '@/spotify/spotifyApi';
import { Alert, Flex, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const RecentPlayedTrackPage: React.FC = () => {
  const [tracks, setTracks] = useState<RecentlyPlayedTrack[]>([]);

  useEffect(() => {
    fetchRecentlyPlayedTrack().then(setTracks);
  }, []);

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
        {tracks.map((track) => {
          return <RecentTrackItem key={track.trackId} track={track} />;
        })}
      </Stack>
    </Stats>
  );
};
export default RecentPlayedTrackPage;
