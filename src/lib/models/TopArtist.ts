import mongoose from 'mongoose';

export type TimeRange = 'long_term' | 'medium_term' | 'short_term';

export interface TopArtistInput {
  userId: string;
  artistId: string;
  rank: number;
  visitedAt: number;
  timeRange: TimeRange;
}

export interface TopArtistDocument extends TopArtistInput, mongoose.Document {}

const TopArtistSchema = new mongoose.Schema({
  userId: { type: String, required: true, immutable: true },
  artistId: { type: String, required: true, immutable: true },
  visitedAt: {
    type: Date,
    required: true,
    immutable: true,
  },
  rank: { type: Number, required: true, immutable: true },
  timeRange: {
    type: String,
    enum: ['long_term', 'medium_term', 'short_term'],
    required: true,
    immutable: true,
  },
});

const TopArtistModel =
  mongoose.models.TopArtist<TopArtistDocument> ||
  mongoose.model<TopArtistDocument>('TopArtist', TopArtistSchema);

export default TopArtistModel;
