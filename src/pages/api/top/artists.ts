import { getCookie } from 'cookies-next';
import { Text } from '@chakra-ui/react';
import spotifyWebApi from '@/spotify/spotifyWebApi';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  artists: Artist[];
};

type Artist = {
  rank: number;
  name: string;
  artistId: string;
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

  const trackItems = await spotifyWebApi.getMyTopArtists(option as any);

  const artists: Artist[] = trackItems.body.items.map((item, index) => {
    return {
      rank: index + 1,
      artistId: item.id,
      name: item.name,
      imageUrl: item.images[0].url,
    };
  });

  res.status(200).json({ artists: artists });
}
