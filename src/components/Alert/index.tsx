import { useAuthState } from '@/atom/authStateAtom';
import { useLoginAlertState } from '@/atom/loginAlertAtom';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';

const ErrorAlert: React.FC = () => {
  const [loginAlertValue, setLoginAlertState] = useLoginAlertState();
  const [authState, setAuthState] = useAuthState();

  useEffect(() => {
    setTimeout(() => setLoginAlertState({ enabled: false }), 30000);
  }, [loginAlertValue]);

  useEffect(() => {
    setLoginAlertState({ enabled: false });
  }, [authState]);

  if (!loginAlertValue.enabled) {
    return <></>;
  }

  return (
    <Alert status='error' position={'fixed'} bottom='0'>
      <AlertIcon />
      <AlertTitle>You have to login to view your stats</AlertTitle>
      <AlertDescription>
        You can login through your Spotify account
      </AlertDescription>
    </Alert>
  );
};
export default ErrorAlert;
