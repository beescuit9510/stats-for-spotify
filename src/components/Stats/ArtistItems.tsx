import { statsModalState } from '@/atom/statsModalAtom';
import { Artist, getTimeRangeByTabType, TabType } from '@/spotify/spotifyApi';
import { Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { useSetRecoilState } from 'recoil';

type ArtistItemProps = { artist: Artist; tabType: TabType };

const ArtistItem: React.FC<ArtistItemProps> = ({ artist, tabType }) => {
  const setStatsModalValue = useSetRecoilState(statsModalState);

  const handleModal = () => {
    setStatsModalValue({
      isOpen: true,
      target: 'artists',
      id: artist.artistId,
      chartLabel: `${artist.name}`,
      timeRange: getTimeRangeByTabType(tabType),
    });
  };

  return (
    <Flex
      justify={'center'}
      align={'center'}
      maxWidth={{ base: '100%', md: '30%' }}
      maxHeight={'30%'}
      direction='column'
      key={artist.artistId}
      paddingBottom={'2rem'}
    >
      <Image alt={artist.name} src={artist.imageUrl} width={'100%'} />
      <Text maxWidth={'fit-content'} fontWeight={'700'} marginTop='0.7rem'>
        <Flex alignItems={'center'} justify='center'>
          <Text>
            {artist.rank}. {artist.name}
          </Text>
          <Icon
            as={RxCounterClockwiseClock}
            fontSize={'1.3rem'}
            ml={'0.5rem'}
            onClick={handleModal}
            cursor={'pointer'}
          />
        </Flex>
      </Text>
    </Flex>
  );
};
export default ArtistItem;
