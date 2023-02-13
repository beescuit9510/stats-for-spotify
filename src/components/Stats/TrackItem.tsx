import { Track } from '@/spotify/spotifyApi';
import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { RxCounterClockwiseClock } from 'react-icons/rx';

type TrackItemProps = { track: Track };

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  return (
    <Stack
      direction={'row'}
      justify={'center'}
      spacing='1rem'
      align='center'
      padding={'2rem'}
      paddingBottom='0rem'
    >
      <Text fontSize={'1.3rem'} fontWeight='900'>
        {track.rank}
      </Text>
      <Image alt='cat' width={'50px'} height={'50px'} src={track.imageUrl} />
      <Stack
        flexGrow={1}
        alignItems='center'
        direction='row'
        justify={'space-between'}
      >
        <Flex direction={'column'}>
          <Text fontWeight={'900'}>{track.title}</Text>
          <Text fontSize={{ base: '0.9rem', md: '1rem' }}>
            {track.artists.join(', ')}
          </Text>
        </Flex>
        <Flex fontSize={'1.5rem'}>
          <Icon as={RxCounterClockwiseClock} />
        </Flex>
      </Stack>
    </Stack>
  );
};
export default TrackItem;
