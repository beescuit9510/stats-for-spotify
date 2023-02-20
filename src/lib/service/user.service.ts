import dbConnect from '../dbConnection';
import UserModel from '../models/User';

export async function saveUser(userId: string, visitedAt: number) {
  await dbConnect();

  const user = await UserModel.findOne({ userId: userId });

  if (user) {
    user.visitedAt.push(visitedAt);

    user.save();

    return user;
  }

  const createdUser = await UserModel.create({
    userId: userId,
    visitedAt: [visitedAt],
  });

  return createdUser;
}

export async function getUser(userId: string) {
  await dbConnect();

  return UserModel.findOne({ userId: userId }).lean();
}
