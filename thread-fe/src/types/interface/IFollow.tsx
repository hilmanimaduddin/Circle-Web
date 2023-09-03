export interface IFollow {
  id: number;
  user_id: number;
  username: string;
  full_name: string;
  email: string;
  picture: string;
  description: string;
  is_followed: boolean;
}
