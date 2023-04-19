type AuthUser = {
  id?: string;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  refreshToken: string;
};

export default AuthUser;
