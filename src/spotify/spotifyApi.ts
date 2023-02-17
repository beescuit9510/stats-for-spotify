import { removeCookies } from 'cookies-next';

export type TabType = 'all time' | 'last 6 months' | 'last 4 weeks';

export const topTabTypes: TabType[] = [
  'last 4 weeks',
  'last 6 months',
  'all time',
];

const timeRange = {
  'all time': 'long_term',
  'last 6 months': 'medium_term',
  'last 4 weeks': 'short_term',
};

export type Track = {
  rank: number;
  title: string;
  trackId: string;
  artists: string[];
  imageUrl: string;
};

export const fetchTopTracks = async (
  selectedTap: TabType
): Promise<Track[]> => {
  const res = await fetch(
    `/api/top/tracks?limit=50&timeRange=${timeRange[selectedTap]}`
  );
  const data = await res.json();
  return data?.tracks as Track[];
};

export type Artist = {
  rank: number;
  name: string;
  artistId: string;
  imageUrl: string;
};

export const fetchTopArtists = async (
  selectedTap: TabType
): Promise<Artist[]> => {
  const res = await fetch(
    `/api/top/artists?limit=50&timeRange=${timeRange[selectedTap]}`
  );
  const data = await res.json();
  return data?.artists as Artist[];
};

export type RecentlyPlayedTrack = {
  title: string;
  trackId: string;
  artists: string[];
  imageUrl: string;
  playedAt: string;
};

export const fetchRecentlyPlayedTrack = async (): Promise<
  RecentlyPlayedTrack[]
> => {
  const res = await fetch(`/api/recent/tracks?limit=50`);
  const data = await res.json();
  return data?.tracks as RecentlyPlayedTrack[];
};

export const logout = () => {
  removeCookies('accessToken');
  removeCookies('refreshToken');
  removeCookies('expiresIn');
};
