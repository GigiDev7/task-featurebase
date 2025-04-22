import type { Database } from "database.types";

export type Post = Database["public"]["Tables"]["posts"]["Row"] & {
  comments: Database["public"]["Tables"]["comments"]["Row"][];
};

export type UserData = {
  email: string;
  id: string;
};
