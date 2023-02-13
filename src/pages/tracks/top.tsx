import Stats from '@/components/Stats/Index';
import TrackItem from '@/components/Stats/TrackItem';
import {
  fetchTopTracks,
  TabType,
  topTabTypes,
  Track,
} from '@/spotify/spotifyApi';
import { Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const TopTrackPage: React.FC = () => {
  const [selectedTap, setSelectedTap] = useState<TabType>(topTabTypes[0]);

  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    fetchTopTracks(selectedTap).then(setTracks);
  }, [selectedTap]);

  return (
    <Stats
      pageTitle='Top Tracks'
      selectedTap={selectedTap}
      setSelectedTap={setSelectedTap}
    >
      <Stack>
        {tracks.map((track) => {
          return <TrackItem key={track.rank} track={track} />;
        })}
      </Stack>
    </Stats>
  );
};
export default TopTrackPage;
