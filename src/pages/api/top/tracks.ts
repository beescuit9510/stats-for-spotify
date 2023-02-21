import { getCookie } from 'cookies-next';
import { Text } from '@chakra-ui/react';
import spotifyWebApi from '@/spotify/spotifyWebApi';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  tracks: Track[];
};

type Track = {
  rank: number;
  title: string;
  trackId: string;
  artists: string[];
  imageUrl: string;
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

  const accessToken = req.cookies.accessToken as string;
  spotifyWebApi.setAccessToken(accessToken);

  const trackItems = await spotifyWebApi.getMyTopTracks(option as any);

  const tracks: Track[] = trackItems.body.items.map((item, index) => {
    const artists = item.artists.map((artist) => artist.name);
    const imageUrl = item.album.images[0].url;
    const title = item.name;
    return { rank: index + 1, trackId: item.id, artists, imageUrl, title };
  });

  res.status(200).json({ tracks: tracks });
}
