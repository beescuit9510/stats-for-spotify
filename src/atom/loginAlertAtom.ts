import { atom, useRecoilState } from 'recoil';

export interface LoginAlertState {
  enabled: boolean;
}

const defaultLoginAlertState: LoginAlertState = {
  enabled: false,
};

export const loginAlertState = atom<LoginAlertState>({
  key: 'loginAlertState',
  default: defaultLoginAlertState,
});

export const useLoginAlertState = () => {
  return useRecoilState(loginAlertState);
};
