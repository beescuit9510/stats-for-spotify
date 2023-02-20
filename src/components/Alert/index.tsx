import { useAuthState } from '@/atom/authStateAtom';
import { loginAlertState, useLoginAlertState } from '@/atom/loginAlertAtom';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useResetRecoilState } from 'recoil';

const ErrorAlert: React.FC = () => {
  const [loginAlertValue, setLoginAlertState] = useLoginAlertState();
  const resetLoginAlertState = useResetRecoilState(loginAlertState);
  const [authState, setAuthState] = useAuthState();

  useEffect(() => {
    setTimeout(() => resetLoginAlertState(), 30000);
  }, [loginAlertValue, resetLoginAlertState]);

  useEffect(() => {
    if (authState.accessToken) {
      resetLoginAlertState();
    }
  }, [authState, resetLoginAlertState]);

  if (!loginAlertValue.enabled) {
    return <></>;
  }

  return (
    <Alert status='error' position={'fixed'} bottom='0'>
      <AlertIcon />
      <AlertTitle>
        {loginAlertValue.type === 'loginNeeded' &&
          'You have to be logged in to view your stats'}
        {loginAlertValue.type === 'tokenExpired' && 'Access token expired'}
      </AlertTitle>
      <AlertDescription>
        {loginAlertValue.type === 'loginNeeded' &&
          'You can login through your Spotify account'}
        {loginAlertValue.type === 'tokenExpired' &&
          'You need to relogin to view your stats'}
      </AlertDescription>
    </Alert>
  );
};
export default ErrorAlert;
