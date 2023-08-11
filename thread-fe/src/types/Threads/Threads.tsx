export interface ThreadCardType {
  id?: string;
  author_picture?: string;
  author_full_name?: string;
  author_username?: string;
  posted_at?: string;
  content?: string;
  image?: string;
  likes?: Likes;
  replies_count?: number;
  is_liked?: boolean;
  user?: UserType;
  liked?: number;
}

export interface UserType {
  id?: number;
  username?: string;
  full_name?: string;
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
