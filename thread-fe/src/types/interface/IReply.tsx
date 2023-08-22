import { UserType } from "./IType";

export interface IReply {
  content?: string;
  image?: MediaSource | Blob | string;
  user?: UserType;
  thread?: number | string;
  posted_at?: string;
  // creater?: UserType;
}
