import { TabType, topTabTypes } from '@/spotify/spotifyApi';
import { Flex, Text } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import TabItem from './TabItem';

type StatsProps = {
  pageTitle: string;
  children: ReactNode;
  selectedTap?: TabType;
  setSelectedTap?: (tabTitle: TabType) => void;
};

const Stats: React.FC<StatsProps> = ({
  pageTitle,
  children,
  selectedTap,
  setSelectedTap,
}) => {
  if (selectedTap && setSelectedTap) {
    return (
      <Flex direction={'column'}>
        <Text fontSize={'2rem'} padding='2rem' paddingLeft={0}>
          {pageTitle} ( {selectedTap} )
        </Text>
        <Flex
          justify={'space-between'}
          alignItems={'center'}
          alignSelf={'center'}
          width={'100%'}
        >
          {topTabTypes.map((tabTitle) => {
            return (
              <TabItem
                key={tabTitle}
                tabTitle={tabTitle}
                isSelectedTab={selectedTap === tabTitle}
                setSelectedTap={setSelectedTap}
              />
            );
          })}
        </Flex>
        {children}
      </Flex>
    );
  }
  return (
    <Flex direction={'column'}>
      <Text fontSize={'2rem'} padding='2rem' paddingLeft={0}>
        {pageTitle}
      </Text>
      {children}
    </Flex>
  );
};
export default Stats;
