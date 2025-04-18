import { useEffect, useState } from "react";
import supabase from "~/utils/supabase";
import { useNavigate, useSearchParams } from "react-router";
import SideBar from "~/components/posts/SideBar";
import Content from "~/components/posts/Content";
import type { PostgrestError } from "@supabase/supabase-js";
import type { Post } from "~/utils/types";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<null | PostgrestError>(null);
  const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        navigate("/signin");
        return;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let query = supabase.from("posts").select("*, createdBy (*)");

      const status = searchParams.get("status");
      const board = searchParams.get("board");
      const tag = searchParams.get("tag");
      const q = searchParams.get("q");

      if (status) {
        query = query.eq("status", status);
      }
      if (board) {
        query = query.eq("board", board);
      }
      if (tag) {
        query = query.eq("tag", tag);
      }
      if (q) {
        query = query.ilike("title", `%${q}%`);
      }

      setLoading(true);

      const { data, error, count } = await query;

      if (error) {
        setError(error);
      }

      if (data) {
        setPosts(data);
      }

      setLoading(false);
    })();
  }, [searchParams]);

  return (
    <div className="p-2 h-dvh flex bg-gray-100">
      <SideBar />
      <Content loading={loading} posts={posts} />
    </div>
  );
}
