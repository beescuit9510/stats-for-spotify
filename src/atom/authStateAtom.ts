import { atom, useRecoilState, useResetRecoilState } from 'recoil';

export interface AuthState {
  accessToken: string | null;
}

const defaultAuthState: AuthState = {
  accessToken: null,
};

export const authState = atom<AuthState>({
  key: 'authState',
  default: defaultAuthState,
});

export const useAuthState = () => {
  return useRecoilState(authState);
};
