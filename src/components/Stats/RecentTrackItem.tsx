import { RecentlyPlayedTrack } from '@/spotify/spotifyApi';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import moment from 'moment';
import React from 'react';

type RecentTrackItemProps = { track: RecentlyPlayedTrack };

const RecentTrackItem: React.FC<RecentTrackItemProps> = ({ track }) => {
  console.log(track);
  return (
    <Stack
      direction={'row'}
      justify={'center'}
      spacing='1rem'
      align='center'
      padding={'2rem'}
      paddingLeft={'1rem'}
      paddingRight={'1rem'}
      paddingBottom='0rem'
    >
      <Image alt='cat' width={'50px'} height={'50px'} src={track.imageUrl} />
      <Stack
        flexGrow={1}
        alignItems='center'
        direction='row'
        justify={'space-between'}
      >
        <Flex direction={'column'} maxWidth='70%'>
          <Text fontWeight={'900'}>{track.title}</Text>
          <Text fontSize={{ base: '0.9rem', md: '1rem' }}>
            {track.artists.join(', ')}
          </Text>
        </Flex>
        <Text>{moment(track.playedAt).fromNow()}</Text>
      </Stack>
    </Stack>
  );
};
export default RecentTrackItem;
