import { authState, useAuthState } from '@/atom/authModalAtom';
import { logout } from '@/spotify/spotifyApi';
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
  Button,
} from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import { ImStatsBars } from 'react-icons/im';
import { useResetRecoilState } from 'recoil';

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {
  const [authStateValue, setAuthStateValue] = useAuthState();
  const resetAuthStatus = useResetRecoilState(authState);

  const handleLogout = () => {
    logout();
    resetAuthStatus();
  };
  return (
    <Box position='sticky' zIndex={1}>
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
          <Link href='/tracks/recent'>Recently played</Link>
        </Stack>
        {authStateValue.accessToken && (
          <Flex display={{ base: 'none', md: 'unset' }}>
            <Flex onClick={handleLogout} cursor={'pointer'}>
              Logout
            </Flex>
          </Flex>
        )}
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
              <Link href='/tracks/top'>
                <MenuItem>Top Tracks</MenuItem>
              </Link>
              <MenuDivider />
              <Link href='/artists/top'>
                <MenuItem>Top Artists</MenuItem>
              </Link>
              <MenuDivider />
              <Link href='/tracks/recent'>
                <MenuItem>Recently played</MenuItem>
              </Link>
              {authStateValue.accessToken && (
                <>
                  <MenuDivider />
                  <Flex onClick={handleLogout} cursor={'pointer'}>
                    <MenuItem>Logout</MenuItem>
                  </Flex>
                </>
              )}
            </MenuList>
          </Flex>
        </Menu>
      </Flex>
      <Divider border={'0.1px solid gray'} />
    </Box>
  );
};
export default Navbar;
