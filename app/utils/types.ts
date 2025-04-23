import type { Database } from "database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
  comments: Comment[];
};

export type UserData = {
  email: string;
  id: string;
};

export type Comment = Database["public"]["Tables"]["comments"]["Row"] & {
  user_id: Database["public"]["Tables"]["users"]["Row"];
  likes: Like[];
};

export type Like = Database["public"]["Tables"]["likes"]["Row"] & {
  user_id: Database["public"]["Tables"]["users"]["Row"];
};
