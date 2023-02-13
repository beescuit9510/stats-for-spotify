import { atom, useRecoilValue, useRecoilState } from 'recoil';

export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresIn: string | null;
}

const defaultAuthState: AuthState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
};

export const authState = atom<AuthState>({
  key: 'AuthState',
  default: defaultAuthState,
});

export const useAuthState = () => {
  return useRecoilState(authState);
};
