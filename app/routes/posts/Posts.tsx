import { useEffect } from "react";
import supabase from "~/utils/supabase";
import { useNavigate } from "react-router";
import SideBar from "~/components/posts/SideBar";
import Content from "~/components/posts/Content";

export default function Posts() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/signin");
        return;
      }
    })();
  }, []);

  return (
    <div className="p-2 h-dvh flex bg-gray-100">
      <SideBar />
      <Content />
    </div>
  );
}
