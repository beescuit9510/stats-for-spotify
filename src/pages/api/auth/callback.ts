import spotifyWebApi from '@/spotify/spotifyWebApi';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';

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

  res.redirect('/');
}
