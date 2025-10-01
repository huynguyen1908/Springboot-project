export interface UserDto {
  userId: string;
  username: string;
  fullName: string | null;
  address: string | null;
  email: string;
  phoneNumber: string;
  avatarUrl: string | null;
  createdAt: string | null;
  updatedAt: string | null;
  active: boolean;
}
