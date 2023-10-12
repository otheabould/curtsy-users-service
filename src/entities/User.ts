export interface User {
  id: string;
  createdAt: number;
  updatedAt: number;

  email: string;
  password: string;
  name: string;
  avatarS3Key: string | null;
}

export interface UserResponse {
  id: string;
  email: string;
  name: string;
  avatarS3Key: string;
}

export const newUserResponse = (user: User): UserResponse => {
  const response: UserResponse = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatarS3Key: user.avatarS3Key,
  };

  return response;
};
