export default interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserProfile = Omit<IUser, "createdAt" | "updatedAt" | "password">;
