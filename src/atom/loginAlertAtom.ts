import { atom, useRecoilState } from 'recoil';

export interface LoginAlertState {
  enabled: boolean;
  type: 'tokenExpired' | 'loginNeeded';
}

const defaultLoginAlertState: LoginAlertState = {
  enabled: false,
  type: 'loginNeeded',
};

export const loginAlertState = atom<LoginAlertState>({
  key: 'loginAlertState',
  default: defaultLoginAlertState,
});

export const useLoginAlertState = () => {
  return useRecoilState(loginAlertState);
};
