import { UserType } from "./IType";

export interface IReply {
  content?: string;
  image?: MediaSource | Blob | string;
  user?: UserType;
  thread?: number | string;
  posted_at?: string | Date;
  // creater?: UserType;
  username?: string;
  full_name?: string;
  password?: string;
  email?: string;
  profile_picture?: string;
  profile_description?: string;
}
