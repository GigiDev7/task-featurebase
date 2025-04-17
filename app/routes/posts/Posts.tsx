import { useEffect } from "react";
import supabase from "~/utils/supabase";
import { useNavigate } from "react-router";

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
    <div>
      <h1>Hello world!</h1>
    </div>
  );
}
