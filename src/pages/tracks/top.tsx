import Stats from '@/components/Stats/Index';
import TrackItem from '@/components/Stats/TrackItem';
import {
  fetchTopTracks,
  TabType,
  topTabTypes,
  Track,
} from '@/spotify/spotifyApi';
import { Flex, Skeleton, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const TopTrackPage: React.FC = () => {
  const [selectedTap, setSelectedTap] = useState<TabType>(topTabTypes[0]);

  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    setTracks([]);
    fetchTopTracks(selectedTap).then(setTracks);
  }, [selectedTap]);

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
