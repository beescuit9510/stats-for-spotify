import { TimeRange } from './../spotify/spotifyApi';
import { atom, useRecoilState, useResetRecoilState } from 'recoil';

export interface StatsModalState {
  isOpen: boolean;
  isLoading: boolean;
  setIsLoadingFalse: () => void;
  id: string;
  target: 'artists' | 'tracks';
  timeRange: TimeRange;
  chartLabel: string;
}

const defaultStatsModalState: StatsModalState = {
  isOpen: false,
  isLoading: false,
  setIsLoadingFalse: () => {},
  id: '',
  target: 'artists',
  timeRange: 'short_term',
  chartLabel: '',
};

export const statsModalState = atom<StatsModalState>({
  key: 'statsModalState',
  default: defaultStatsModalState,
});

export const useStatsModalState = () => {
  return useRecoilState(statsModalState);
};
