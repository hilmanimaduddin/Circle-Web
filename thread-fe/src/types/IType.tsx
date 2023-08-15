export interface ThreadCardType {
  id?: string;
  author_full_name?: string;
  author_username?: string;
  author_picture?: string;
  posted_at?: string;
  content?: string;
  image?: string;
  replies_count?: number;
  is_liked?: boolean;
  user?: UserType;
  likes?: Likes;
  liked?: number;
}

export interface UserType {
  id?: number;
  username?: string;
  full_name?: string;
  password?: string;
  email?: string;
  profile_picture?: string;
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
