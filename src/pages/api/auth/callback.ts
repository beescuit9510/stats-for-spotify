import { TimeRange } from './../../../lib/models/TopArtist';
import {
  insertTopArtistChartData,
  insertTopTrackChartData,
} from '@/lib/service/chart.service';
import { saveUser } from '@/lib/service/user.service';
import spotifyWebApi from '@/spotify/spotifyWebApi';
import { setCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';

export const saveUserAndTopData = async (accessToken: string) => {
  spotifyWebApi.setAccessToken(accessToken);

  const me = await spotifyWebApi.getMe();
  const meId = me.body.id;
  const visitedAt = Date.now();

  saveUser(meId, visitedAt);

  const timeRanges: TimeRange[] = ['long_term', 'medium_term', 'short_term'];

  timeRanges.forEach(async (term) => {
    const option = {
      time_range: term,
      limit: '50',
    };

    const artistRes = await spotifyWebApi.getMyTopArtists(option as any);
    const artistInput = artistRes.body.items.map((artist, index) => ({
      userId: meId,
      artistId: artist.id,
      rank: index + 1,
      visitedAt,
      timeRange: term,
    }));
    insertTopArtistChartData(artistInput);

    const trackRes = await spotifyWebApi.getMyTopTracks(option as any);
    const trackInput = trackRes.body.items.map((track, index) => ({
      userId: meId,
      trackId: track.id,
      rank: index + 1,
      visitedAt,
      timeRange: term,
    }));

    insertTopTrackChartData(trackInput);
  });
};

type Data = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const code = req?.query?.code ?? '';
  const auth = await spotifyWebApi.authorizationCodeGrant(code as string);

  const {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_in: expiresIn,
  } = auth.body;

  spotifyWebApi.setAccessToken(accessToken);
  spotifyWebApi.setRefreshToken(refreshToken);

  console.log('access_token:', accessToken);
  console.log('refresh_token:', refreshToken);
  console.log(`Sucessfully retreived access token. Expires in ${expiresIn} s.`);

  setCookie('accessToken', accessToken, { req, res, maxAge: expiresIn });
  setCookie('refreshToken', refreshToken, { req, res, maxAge: expiresIn });
  setCookie('expiresIn', expiresIn, { req, res, maxAge: expiresIn });

  saveUserAndTopData(accessToken);

  res.redirect('/');
}
