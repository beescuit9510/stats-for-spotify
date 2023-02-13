import { TabType } from '@/spotify/spotifyApi';
import { Flex } from '@chakra-ui/react';
import React from 'react';

type TabItemProps = {
  tabTitle: TabType;
  isSelectedTab: boolean;
  setSelectedTap: (tabTitle: TabType) => void;
};

const TabItem: React.FC<TabItemProps> = ({
  tabTitle,
  isSelectedTab,
  setSelectedTap,
}) => {
  const handleOnClick = () => {
    setSelectedTap(tabTitle);
  };

  return isSelectedTab ? (
    <Flex
      justify={'center'}
      flexGrow='1'
      fontSize={'1.1rem'}
      padding='1rem'
      cursor={'pointer'}
      onClick={handleOnClick}
      border={'1px solid'}
      borderColor={'gray.500'}
      borderBottom={'none'}
      borderTopLeftRadius={'5px'}
      borderTopRightRadius={'5px'}
    >
      {tabTitle}
    </Flex>
  ) : (
    <Flex
      justify={'center'}
      flexGrow='1'
      fontSize={'1.1rem'}
      padding='1rem'
      cursor={'pointer'}
      onClick={handleOnClick}
      borderBottom={'1px solid'}
      borderColor={'gray.500'}
      color={'blue.500'}
    >
      {tabTitle}
    </Flex>
  );
};
export default TabItem;
