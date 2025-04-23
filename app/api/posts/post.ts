import supabase from "~/utils/supabase";

export function fetchPost(id: string) {
  return supabase
    .from("posts")
    .select("*, createdBy(*), comments(*, user_id(*), likes(*, user_id(*)))")
    .eq("id", id)
    .order("created_at", { referencedTable: "comments", ascending: false })
    .single();
}
