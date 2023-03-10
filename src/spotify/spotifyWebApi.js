import SpotifyWebApi from 'spotify-web-api-node';

const host = process.env.HOST;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

console.log(host);
console.log(clientId);
console.log(clientSecret);

const spotifyWebApi = new SpotifyWebApi({
  redirectUri: host,
  clientId: clientId,
  clientSecret: clientSecret,
});

export default spotifyWebApi;
