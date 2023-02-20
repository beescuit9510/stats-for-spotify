import { statsModalState } from '@/atom/statsModalAtom';
import { getTimeRangeByTabType, TabType, Track } from '@/spotify/spotifyApi';
import { Button, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { useRecoilValue, useSetRecoilState } from 'recoil';

type TrackItemProps = { track: Track; tabType: TabType };

const TrackItem: React.FC<TrackItemProps> = ({ track, tabType }) => {
  const setStatsModalValue = useSetRecoilState(statsModalState);
  const [isLoading, setIsLoading] = useState(false);

  const handleModal = () => {
    setIsLoading(true);

    setStatsModalValue({
      isOpen: true,
      isLoading: true,
      setIsLoadingFalse: () => setIsLoading(false),
      target: 'tracks',
      id: track.trackId,
      chartLabel: `${track.title} - ${track.artists.join(', ')}`,
      timeRange: getTimeRangeByTabType(tabType),
    });
  };

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
        <Flex
          as={Button}
          fontSize={'1.5rem'}
          onClick={handleModal}
          cursor={'pointer'}
          isLoading={isLoading}
          variant='ghost'
          _hover={{ bg: 'none' }}
        >
          <Icon as={RxCounterClockwiseClock} />
        </Flex>
      </Stack>
    </Stack>
  );
};
export default TrackItem;
