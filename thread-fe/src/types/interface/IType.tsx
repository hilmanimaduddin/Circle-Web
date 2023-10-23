export interface ThreadCardType {
  id?: string | number;
  author_full_name?: string;
  author_username?: string;
  author_picture?: string;
  author_id?: number;
  posted_at?: string | Date;
  posted?: Date;
  date?: string;
  content?: string;
  image?: string | File;
  replies_count?: number;
  likes_count?: number;
  is_liked?: boolean;
  user?: UserType;
  users?: number;
  likes?: Likes;
  liked?: number;
}

export interface IGetThreads {
  content?: string;
  image?: MediaSource | Blob | string;
  user?: number;
}

export interface UserType {
  id?: number;
  username?: string;
  full_name?: string;
  password?: string;
  email?: string;
  profile_picture?: string;
  profile_background?: string;
  profile_description?: string;
}

export interface Likes {
  id?: number;
  likes_count?: number;
  user?: number;
  thread?: number;
}

export interface Replies {
  id?: number;
  content?: string;
  user?: number;
  thread?: number;
}

export interface Auth {
  id: number;
  username: string;
  full_name: string;
  email: string;
  profile_picture: string;
  profile_background: string;
  profile_description: string;
}
