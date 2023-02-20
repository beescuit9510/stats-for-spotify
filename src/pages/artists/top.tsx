import ArtistItem from '@/components/Stats/ArtistItems';
import Stats from '@/components/Stats/Index';
import {
  Artist,
  fetchTopArtists,
  TabType,
  topTabTypes,
} from '@/spotify/spotifyApi';
import {
  Flex,
  Skeleton,
  Stack,
  Text,
  Image,
  Icon,
  Box,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RxCounterClockwiseClock } from 'react-icons/rx';

const ArtistTopPage: React.FC = () => {
  const [selectedTap, setSelectedTap] = useState<TabType>(topTabTypes[0]);

  const [artists, setArtists] = useState<Artist[]>([]);

  useEffect(() => {
    setArtists([]);
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
