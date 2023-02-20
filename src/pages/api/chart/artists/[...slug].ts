import { getCookie } from 'cookies-next';
import spotifyWebApi from '@/spotify/spotifyWebApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getUser } from '@/lib/service/user.service';
import { getTopArtistChartData } from '@/lib/service/chart.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { slug } = req.query;
  slug = slug as [string];

  if (!slug || slug.length < 2) {
    return res.status(400).json({
      error: 'No slug provided',
    });
  }

  const id = slug[0];
  const timeRange = slug[1];

  const accessToken = getCookie('accessToken', { req }) as string;
  spotifyWebApi.setAccessToken(accessToken);

  const me = await spotifyWebApi.getMe();
  const userId = me.body.id;

  const user = await getUser(userId);

  const chartData = await getTopArtistChartData(userId, id, timeRange);

  res.status(200).json({ chartData: chartData, visitedAt: user.visitedAt });
}
