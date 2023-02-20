import mongoose from 'mongoose';

export interface UserDocument extends mongoose.Document {
  userId: string;
  visitedAt: [Date];
  createdAt: Date;
}

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, immutable: true },
  visitedAt: { type: [Date], immutable: true },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    required: true,
    immutable: true,
  },
});

const UserModel =
  mongoose.models.User<UserDocument> ||
  mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
