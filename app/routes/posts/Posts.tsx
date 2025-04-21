import { useEffect } from "react";
import supabase from "~/utils/supabase";
import { useNavigate, useSearchParams } from "react-router";
import SideBar from "~/components/posts/SideBar";
import Content from "~/components/posts/Content";
import { useUserContext } from "~/context/userContext";
import { usePostContext } from "~/context/postContext";
import { createPortal } from "react-dom";

export default function Posts() {
  const { updateUser } = useUserContext();
  const { showSuccessFeedback } = usePostContext();

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        navigate("/signin");
        return;
      }

      updateUser({ email: data.user.email!, id: data.user.id });
    })();
  }, []);

  return (
    <div className="p-2 h-dvh flex bg-gray-100">
      <SideBar />
      <Content />

      {showSuccessFeedback &&
        createPortal(
          <div className="z-50 bg-gray-200 absolute bottom-6 right-10 flex items-center p-4 rounded-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="!h-4 !w-4 ml-px mr-2 text-emerald-600 dark:text-emerald-600"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.75 22.5C5.81294 22.5 1 17.6871 1 11.75C1 5.81294 5.81294 1 11.75 1C17.6871 1 22.5 5.81294 22.5 11.75C22.5 17.6871 17.6871 22.5 11.75 22.5ZM16.5182 9.39018C16.8718 8.9659 16.8145 8.33534 16.3902 7.98177C15.9659 7.62821 15.3353 7.68553 14.9818 8.10981L10.6828 13.2686L8.45711 11.0429C8.06658 10.6524 7.43342 10.6524 7.04289 11.0429C6.65237 11.4334 6.65237 12.0666 7.04289 12.4571L10.0429 15.4571C10.2416 15.6558 10.5146 15.7617 10.7953 15.749C11.076 15.7362 11.3384 15.606 11.5182 15.3902L16.5182 9.39018Z"
                fill="currentColor"
              ></path>
            </svg>

            <span>Post added sucessfully!</span>
          </div>,
          document.body
        )}
    </div>
  );
}
