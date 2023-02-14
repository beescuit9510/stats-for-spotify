import { useAuthState } from '@/atom/authStateAtom';
import { getCookie } from 'cookies-next';
import React, { ReactNode, useEffect } from 'react';
import Navbar from '../Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [authState, setAuthState] = useAuthState();

  useEffect(() => {
    setAuthState({
      accessToken: (getCookie('accessToken') as string) || null,
      refreshToken: (getCookie('refreshToken') as string) || null,
      expiresIn: (getCookie('expiresIn') as string) || null,
    });
  }, []);

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};
export default Layout;
