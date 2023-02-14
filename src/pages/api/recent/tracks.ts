import { getCookie } from 'cookies-next';
import spotifyWebApi from '@/spotify/spotifyWebApi';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  tracks: RecentlyPlayedTrack[];
};

type RecentlyPlayedTrack = {
  title: string;
  trackId: string;
  artists: string[];
  imageUrl: string;
  playedAt: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const option = {
    time_range: req!.query?.timeRange,
    limit: req!.query?.limit,
    offset: req!.query?.offset,
  };

  const accessToken = getCookie('accessToken', { req }) as string;
  spotifyWebApi.setAccessToken(accessToken);

  const trackItems = await spotifyWebApi.getMyRecentlyPlayedTracks(
    option as any
  );

  const tracks: RecentlyPlayedTrack[] = trackItems.body.items.map((item) => {
    const artists = item.track.artists.map((artist) => artist.name);
    const imageUrl = item.track.album.images[0].url;
    const title = item.track.name;
    return {
      trackId: item.track.id,
      artists,
      imageUrl,
      title,
      playedAt: item.played_at,
    };
  });

  res.status(200).json({ tracks: tracks });
}
