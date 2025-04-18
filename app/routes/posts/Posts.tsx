import { useEffect, useState } from "react";
import supabase from "~/utils/supabase";
import { useNavigate } from "react-router";
import SideBar from "~/components/posts/SideBar";
import Content from "~/components/posts/Content";
import type { PostgrestError } from "@supabase/supabase-js";
import type { Database } from "database.types";
import type { Post } from "~/utils/types";

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState<null | PostgrestError>(null);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();

      if (userError || !userData.user) {
        navigate("/signin");
        return;
      }

      const { data, error, count } = await supabase.from("posts").select();

      if (error) {
        setError(error);
      }

      if (data) {
        setPosts(data);
      }
    })();
  }, []);

  console.log(posts);

  return (
    <div className="p-2 h-dvh flex bg-gray-100">
      <SideBar />
      <Content posts={posts} />
    </div>
  );
}
