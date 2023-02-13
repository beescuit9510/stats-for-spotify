import React from 'react';
import { Flex, Stack, Text, Icon } from '@chakra-ui/react';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { RiPlayListFill } from 'react-icons/ri';
import { MdOutlineReplay, MdSwapVert } from 'react-icons/md';

type ExplainProps = {};

const Explain: React.FC<ExplainProps> = () => {
  return (
    <Stack
      maxWidth={{ base: '90%' }}
      margin='auto'
      justify={'center'}
      alignItems='center'
      marginTop={'5rem'}
      marginBottom={'5rem'}
      spacing={'3rem'}
    >
      <Stack
        width={'100%'}
        justify={'flex-start'}
        alignItems='center'
        direction={'row'}
        spacing='1.5rem'
      >
        <Flex>
          <Icon as={AiOutlineOrderedList} fontSize='7rem' />
        </Flex>
        <Stack>
          <Text fontSize={'2rem'} fontWeight='700'>
            Your own charts
          </Text>
          <Text>
            View your most listened tracks, artists and genres and switch
            between 3 different time periods. Your data is updated approximately
            every day.
          </Text>
        </Stack>
      </Stack>
      <Stack
        width={'100%'}
        justify={'flex-start'}
        alignItems='center'
        direction={'row'}
        spacing='1.5rem'
      >
        <Flex>
          <Icon as={MdSwapVert} fontSize='7rem' />
        </Flex>
        <Stack>
          <Text fontSize={'2rem'} fontWeight='700'>
            Compare to last visit
          </Text>
          <Text>
            See how your personal ranking changes over time, indicated by arrows
            compared to your last visit
          </Text>
        </Stack>
      </Stack>
      <Stack
        width={'100%'}
        justify={'flex-start'}
        alignItems='center'
        direction={'row'}
        spacing='1.5rem'
      >
        <Flex>
          <Icon as={RiPlayListFill} fontSize='7rem' />
        </Flex>
        <Stack>
          <Text fontSize={'2rem'} fontWeight='700'>
            Your own charts
          </Text>
          <Text>
            See how your personal ranking changes over time, indicated by arrows
            compared to your last visit
          </Text>
        </Stack>
      </Stack>
      <Stack
        width={'100%'}
        justify={'flex-start'}
        alignItems='center'
        direction={'row'}
        spacing='1.5rem'
      >
        <Flex>
          <Icon as={MdOutlineReplay} fontSize='7rem' />
        </Flex>
        <Stack>
          <Text fontSize={'2rem'} fontWeight='700'>
            Recently played tracks
          </Text>
          <Text>Check out your recently played tracks with timestamps</Text>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default Explain;
