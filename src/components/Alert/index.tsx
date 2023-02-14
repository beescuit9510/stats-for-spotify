import { useLoginAlertState, loginAlertState } from '@/atom/loginAlertAtom';
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

  useEffect(() => {
    setTimeout(() => setLoginAlertState({ enabled: false }), 30000);
  }, [loginAlertValue]);

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
