import { TimeRange } from '@/lib/models/TopArtist';
import TopTrackModel, { TopTrackInput } from '@/lib/models/TopTrack';
import dbConnect from '../dbConnection';
import TopArtistModel, { TopArtistInput } from '../models/TopArtist';

export async function insertTopTrackChartData(input: TopTrackInput[]) {
  await dbConnect();

  await TopTrackModel.insertMany(input);
}

export async function insertTopArtistChartData(input: TopArtistInput[]) {
  await dbConnect();

  await TopArtistModel.insertMany(input);
}

export async function getTopTrackChartData(
  userId: string,
  trackId: string,
  timeRange: string
) {
  await dbConnect();

  return TopTrackModel.find({
    $and: [{ userId: userId }, { trackId: trackId }, { timeRange: timeRange }],
  }).lean();
}

export async function getTopArtistChartData(
  userId: string,
  artistId: string,
  timeRange: string
) {
  await dbConnect();

  return TopArtistModel.find({
    $and: [
      { userId: userId },
      { artistId: artistId },
      { timeRange: timeRange },
    ],
  }).lean();
}
