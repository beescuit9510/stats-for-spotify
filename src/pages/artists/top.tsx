import ArtistItem from '@/components/Stats/ArtistItems';
import Stats from '@/components/Stats/Index';
import {
  Artist,
  fetchTopArtists,
  TabType,
  topTabTypes,
} from '@/spotify/spotifyApi';
import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const ArtistTopPage: React.FC = () => {
  const [selectedTap, setSelectedTap] = useState<TabType>(topTabTypes[0]);

  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    fetchTopArtists(selectedTap).then(setArtists);
  }, [selectedTap]);

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
          {artists.map((artist) => {
            return <ArtistItem artist={artist} key={artist.artistId} />;
          })}
        </Flex>
      </Stats>
    </>
  );
};
export default ArtistTopPage;
