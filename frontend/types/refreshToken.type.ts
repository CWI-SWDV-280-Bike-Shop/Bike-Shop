import User from './user.type';

type RefreshToken = {
  _id: string;
  token: string;
  user: User;
  createdAt: string;
  updatedAt: string;
};

export default RefreshToken;
