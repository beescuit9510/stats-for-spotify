import mongoose from 'mongoose';

export interface TopTrackInput {
  userId: string;
  trackId: string;
  rank: number;
  visitedAt: number;
  timeRange: 'long_term' | 'medium_term' | 'short_term';
}

export interface TopTrackDocument extends TopTrackInput, mongoose.Document {}

const TopTrackSchema = new mongoose.Schema({
  userId: { type: String, required: true, immutable: true },
  trackId: { type: String, required: true, immutable: true },
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

const TopTrackModel =
  mongoose.models.TopTrack<TopTrackDocument> ||
  mongoose.model<TopTrackDocument>('TopTrack', TopTrackSchema);

export default TopTrackModel;
