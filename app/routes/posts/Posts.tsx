import { useEffect } from "react";
import supabase from "~/utils/supabase";
import { useNavigate } from "react-router";
import SideBar from "~/components/posts/SideBar";

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
    <div className="p-2 h-dvh">
      <SideBar />
    </div>
  );
}
