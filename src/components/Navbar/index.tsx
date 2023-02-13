import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Divider,
  Flex,
  Icon,
  Stack,
  Text,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  MenuDivider,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { ImStatsBars } from 'react-icons/im';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <Box position='sticky'>
      <Flex alignItems={'center'} padding='2rem' maxWidth='860px' mx='auto'>
        <Link href='/'>
          <Flex justify={'center'} align={'center'} mr='1rem'>
            <Flex align='center' mr={2}>
              <Icon as={ImStatsBars} fontSize={'1.5rem'} />
            </Flex>
            <Text fontSize='1.2rem' minWidth={'fit-content'}>
              Stats for Spotify
            </Text>
          </Flex>
        </Link>
        <Stack
          direction='row'
          flexGrow={1}
          spacing={'1rem'}
          display={{ base: 'none', md: 'unset' }}
        >
          <Link href='/tracks/top'>Top Tracks</Link>
          <Link href='/artists/top'>Top Artists</Link>
          <Link href='/genre/top'>Top Generes</Link>
          <Link href='/tracks/recent'>Recently played</Link>
        </Stack>
        <Flex display={{ base: 'none', md: 'unset' }}>
          <Link href='/'>Account</Link>
        </Flex>
        <Menu>
          <Flex
            flexGrow={1}
            justifyContent={'flex-end'}
            display={{ base: 'flex', md: 'none' }}
          >
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='ghost'
              borderRadius={'5px'}
            />
            <MenuList>
              <MenuItem>
                <Link href='/tracks/top'>Top Tracks</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Link href='/artists/top'>Top Artists</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Link href='/genre/top'>Top Generes</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Link href='/tracks/recent'>Recently played</Link>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Link href='/'>Account</Link>
              </MenuItem>
            </MenuList>
          </Flex>
        </Menu>
      </Flex>
      <Divider border={'0.1px solid gray'} />
    </Box>
  );
};
export default Navbar;
